#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import { cyan, green, red } from "picocolors";
import Commander from "commander";
import prompts from "prompts";
import type { InitialReturnValue } from "prompts";
import packageJson from "./package.json";
import { generateImage } from "./generate";

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const onPromptState = (state: {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write("\x1B[?25h");
    process.stdout.write("\n");
    process.exit(1);
  }
};

let outputFilePath: string;

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<the prompt to generate the image>")
  .usage(`${green("<prompt>")} [options]`)
  .action((outFile) => {
    console.log("outFile", outFile);
    outputFilePath = outFile;
  })
  .option(
    "--f, --file",
    `

  Saves the generated image in the specified file.
`
  )
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<string> {
  const sentences = [];

  const res = await prompts({
    onState: onPromptState,
    type: "text",
    name: "prompt",
    message: `Describe what you imagine, to generate an image:`,
    initial: "imagine a mighty knight fithing a flying dragon in the sky",
    validate: (value) => (value ? true : "Please insert a sentence"),
  });

  return res.prompt;
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
