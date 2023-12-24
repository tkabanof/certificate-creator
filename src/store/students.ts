import { createEffect, createEvent, createStore, sample } from "effector";
import { Sex, Student, Students } from "../types/students";
import { isStudents } from "../typeguards/isStudents";
import { EngLevel, engLevels } from "../consts/rankings";

export const $students = createStore<Students>([]);

export const setStudents = createEvent<Students>();
export const changeLevel = createEvent<{
  studentId: Student["id"];
  engLevel: EngLevel["id"];
}>();

export const changeSex = createEvent<{
  studentId: Student["id"];
  sex: Sex;
}>();

export const changeScore = createEvent<{
  studentId: Student["id"];
  score: string;
}>();

$students.on(setStudents, (state, payload) => {
  return payload;
});
$students.on(changeLevel, (state, payload) => {
  return state.map((student) => {
    if (student.id === payload.studentId) {
      return { ...student, level: payload.engLevel };
    }
    return student;
  });
});
$students.on(changeSex, (state, payload) => {
  return state.map((student) => {
    if (student.id === payload.studentId) {
      return { ...student, sex: payload.sex };
    }
    return student;
  });
});
$students.on(changeScore, (state, payload) => {
  return state.map((student) => {
    if (student.id === payload.studentId) {
      return { ...student, score: payload.score };
    }
    return student;
  });
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
