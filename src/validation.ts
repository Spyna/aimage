import { red } from "picocolors";
import { SafeParseReturnType, z } from "zod";

const optionsValidation = z.object({
  folder: z.string().min(1),
  size: z.string().regex(/^(256x256|512x512|1024x1024|1792x1024|1024x1792)$/),
  model: z.string().regex(/^(dall-e-3|dall-e-2)$/),
});

export type OptionsValidation = z.infer<typeof optionsValidation>;

export type ValidationErrors = {
  [key in keyof OptionsValidation]?: string;
};

function performValidation(
  data: unknown
): SafeParseReturnType<unknown, OptionsValidation> {
  return optionsValidation.safeParse(data);
}

export function validate(data: unknown) {
  const validationErrors: ValidationErrors = {};
  const result = performValidation(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => `${error.path[0]}:  ${error.message}`);
    console.log(red("Invalid options"), errors.join(", "));
    process.exit(1);
  }
}
