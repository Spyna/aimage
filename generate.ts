import OpenAI from "openai";
import fs from "fs";
import path from "path";
import ora from "ora";
import { cyan, green, red } from "picocolors";
import undici from "undici";

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

export async function generateImage(prompt: string) {
  if (!process.env.OPENAI_API_KEY) {
    console.log(
      `\n${red("Please set the")} ${cyan("OPENAI_API_KEY")} ${red("environment variable to use this tool.")}\n`
    );
    process.exit(1);
  }
  const spinner = ora("generating image, could take a few...").start();

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
  });
  spinner.stop();
  spinner.text = "generating filename...";
  spinner.start();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `based on this image generation prompt\n\`${prompt}\`\n generata a file name to save the generated image. output only the filename without extension.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const fileName = completion.choices[0].message.content;
  spinner.stop();
  for (let index = 0; index < response.data.length; index++) {
    const message = response.data[index];
    // console.log(message);
    console.log(green("revised prompt:\n"), message.revised_prompt);
    console.log();

    const image_url = message.url;
    console.log(green("✔ image generated:"), image_url);
    console.log();
    spinner.stop();
    spinner.text = "downloading image...";
    spinner.start();

    const filename = `images/${fileName}-${index}.png`;
    await saveImage(image_url!, filename);
    spinner.stop();
    console.log(green(`✔ Image saved successfully in`), filename);
    fs.writeFileSync(
      `images/${fileName}-${index}.txt`,
      message.revised_prompt ?? prompt
    );
  }
}

async function saveImage(image_url: string, filename: string) {
  const folderPath = path.dirname(filename);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const imagePath = path.join(folderPath, path.basename(filename));
  const { body } = await undici.request(image_url);
  const writeStream = fs.createWriteStream(imagePath);
  body.pipe(writeStream);
  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}
