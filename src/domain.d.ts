export interface Options {
  size: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
  model: "dall-e-3" | "dall-e-2";
  folder: string;
}
export interface GenerationRequest {
  options: Options;
  prompt: string;
}
