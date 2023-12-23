import { createEffect, createEvent, createStore, sample } from "effector";
import { Students } from "../types/students";
import { isStudents } from "../typeguards/isStudents";

export const $students = createStore<Students>([]);

export const setStudents = createEvent<Students>();

$students.on(setStudents, (state, payload) => {
  return payload;
});

const saveStudents = createEffect<Students, void, void>((params) => {
  localStorage.setItem("students", JSON.stringify(params));
});

export const loadStudentsFx = createEffect<void, Students, void>(async () => {
  const studentsRaw = localStorage.getItem("students");
  const students: unknown = JSON.parse(studentsRaw ?? "");
  if (isStudents(students)) {
    return students;
  }
  return [];
});

$students.on(loadStudentsFx.doneData, (state, payload) => {
  return payload;
});
sample({
  source: $students,
  target: saveStudents,
});
