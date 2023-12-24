import { createEffect, createEvent, createStore, sample } from "effector";
import { Sex, Student, Students } from "../types/students";
import { isStudents } from "../typeguards/isStudents";
import { EngLevel, engLevels } from "../consts/rankings";
import { convertToLatin } from "../helpers/convertToLatin";
import { cyrillicToTranslit } from "../helpers/transliter";

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
export const changeRuName = createEvent<{
  studentId: Student["id"];
  name: string;
}>();
export const changeEnName = createEvent<{
  studentId: Student["id"];
  nameTranslit: string;
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
$students.on(changeRuName, (state, payload) => {
  return state.map((student) => {
    if (student.id === payload.studentId) {
      return {
        ...student,
        name: payload.name,
        nameTraslit: cyrillicToTranslit.transform(payload.name),
      };
    }
    return student;
  });
});
$students.on(changeEnName, (state, payload) => {
  return state.map((student) => {
    if (student.id === payload.studentId) {
      return { ...student, nameTraslit: payload.nameTranslit };
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
