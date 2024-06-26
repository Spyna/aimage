#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import { cyan, red } from "picocolors";
import Commander from "commander";
import prompts from "prompts";
import type { InitialReturnValue } from "prompts";
import packageJson from "../package.json";
import { generateImage } from "./generate";
import { GenerationRequest, Options } from "./domain";
import { validate } from "./validation";

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const onPromptState = (state: {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}) => {
  if (state.aborted) {
    process.stdout.write("\x1B[?25h");
    process.stdout.write("\n");
    process.exit(1);
  }
};

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .option(
    "-s, --size <size>",
    "Size of the image to generate: 256x256 | 512x512 | 1024x1024 | 1792x1024 | 1024x1792",
    "1024x1024"
  )
  .option(
    "-m, --model <model>",
    "The model to use: dall-e-3 / dall-e-2",
    "dall-e-3"
  )
  .option(
    "-f, --folder <folder>",
    `Saves the generated image in the specified folder`,
    "./images"
  )
  .usage(`[options]`)
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<GenerationRequest> {
  validate(program.opts());

  const res = await prompts({
    onState: onPromptState,
    type: "text",
    name: "prompt",
    message: `Describe what you imagine, to generate an image:`,
    initial: "imagine a mighty knight fithing a flying dragon in the sky",
    validate: (value) => (value ? true : "Please insert a sentence"),
  });

  return { prompt: res.prompt, options: program.opts() as Options };
}

run()
  .then(generateImage)
  .catch(async (reason) => {
    console.log();
    console.log("Aborting.");
    if (reason.command) {
      console.log(`  ${cyan(reason.command)} has failed.`);
    } else {
      console.log(
        red("Unexpected error. Please report it as a bug:") + "\n",
        reason
      );
    }
    console.log();

    process.exit(1);
  });
