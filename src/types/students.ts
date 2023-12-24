import { EngLevel } from "../consts/rankings";
export type Sex = "male" | "female";

export type Student = {
  id: string;
  origId: string;
  sex: Sex;
  name: string;
  nameTraslit: string;
  level: EngLevel["id"] | undefined;
  score: string | number;
};
export type Students = Student[];
