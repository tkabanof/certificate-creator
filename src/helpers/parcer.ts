import { Students } from "../types/students";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { v4 as uuidv4 } from "uuid";
import { engLevels } from "../consts/rankings";
import { convertToLatin } from "./convertToLatin";
import { rankingRegExp, scoreRegExp } from "./regExp";

type ParsedRecord = string[];

let cyrillicToTranslit: {
  transform(input: string, spaceReplacement?: string): string;
  reverse(input: string, spaceReplacement?: string): string;
};
// @ts-ignore
cyrillicToTranslit = new CyrillicToTranslit();

const isValidRow = (
  values: unknown,
): values is [string, string, string, string, string] => {
  return (
    Array.isArray(values) &&
    values.length > 4 &&
    typeof values[0] === "string" &&
    !isNaN(Number(values[0])) &&
    typeof values[1] === "string" &&
    typeof values[2] === "string" &&
    values[2].length > 0 &&
    typeof values[3] === "string" &&
    values[3].length > 0 &&
    typeof values[4] === "string"
  );
};

export const parser = (value: ParsedRecord[]) => {
  return value.reduce<Students>((previousValue, currentValue) => {
    if (isValidRow(currentValue)) {
      const trimmedName = currentValue[2].trim();
      return previousValue.concat({
        id: uuidv4(),
        origId: currentValue[0],
        sex: "male",
        name: trimmedName,
        nameTraslit: cyrillicToTranslit.transform(trimmedName),
        level: engLevels.find((level) => {
          if (rankingRegExp.test(convertToLatin(currentValue[3]))) {
            const idx = convertToLatin(currentValue[3]).search(rankingRegExp);
            console.log(
              convertToLatin(currentValue[3])
                .substring(idx)
                .replace("(", "")
                .replace(")", ""),
            );
            return (
              level.rank ===
              convertToLatin(currentValue[3])
                .trim()
                .substring(idx)
                .replace("(", "")
                .replace(")", "")
            );
          }
          return (
            level.level === convertToLatin(currentValue[3]).substring(0, 2)
          );
        })?.id,
        score: scoreRegExp.test(currentValue[4])
          ? currentValue[4].substring(0, 2)
          : currentValue[4],
      });
    }
    return previousValue;
  }, []);
};
