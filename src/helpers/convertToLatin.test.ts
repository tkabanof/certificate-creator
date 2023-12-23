import { convertToLatin } from "./convertToLatin";

describe("convertToLatin", () => {
  it("convertToLatin should return", () => {
    expect(convertToLatin("С1")).toBe("C1");
  });
});
