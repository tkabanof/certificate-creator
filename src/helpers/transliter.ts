import CyrillicToTranslit from "cyrillic-to-translit-js";

export let cyrillicToTranslit: {
  transform(input: string, spaceReplacement?: string): string;
  reverse(input: string, spaceReplacement?: string): string;
};
// @ts-ignore
cyrillicToTranslit = new CyrillicToTranslit();
