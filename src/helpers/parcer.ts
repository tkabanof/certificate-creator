import {Students} from "../types/students";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

type ParsedRecord = string[];

let cyrillicToTranslit: {
    transform(input: string, spaceReplacement?: string): string;
    reverse(input: string, spaceReplacement?: string): string
};
// @ts-ignore
cyrillicToTranslit = new CyrillicToTranslit();

const isValidRow = (values: unknown): values is [string, string, string, string, string]=>{
    return Array.isArray(values) &&
        values.length > 4 &&
        typeof values[0] === "string" && !isNaN(Number(values[0])) &&
        typeof values[1] === "string" &&
        typeof values[2] === "string" && values[2].length > 0 &&
        typeof values[3] === "string" && values[3].length > 0 &&
        typeof values[4] === "string"
}
export const parser = (value: ParsedRecord[])=>{
    return value.reduce<Students>((previousValue, currentValue) => {
        if (isValidRow(currentValue)) {
            const trimmedName = currentValue[2].trim();
            return previousValue.concat({
                origId:currentValue[0],
                name: trimmedName,
                nameTraslit: cyrillicToTranslit.transform(trimmedName),
                level: currentValue[3],
                score: currentValue[4],
            })
        }
        return previousValue
    }, []);
}