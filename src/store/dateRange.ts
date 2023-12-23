import { createEffect, createEvent, createStore, sample } from "effector";
import dayjs from "dayjs";
import { Students } from "../types/students";
import { isStudents } from "../typeguards/isStudents";
import { $students } from "./students";

type DateRange = [dayjs.Dayjs, dayjs.Dayjs];

export const $dateRange = createStore<DateRange>([dayjs(), dayjs()]);

export const setDateRange = createEvent<DateRange>();

$dateRange.on(setDateRange, (state, payload) => {
  return payload;
});

const saveDateRange = createEffect<DateRange, void, void>((params) => {
  localStorage.setItem("dateRange", JSON.stringify(params));
});

export const loadDateRangeFx = createEffect<void, DateRange, void>(async () => {
  const notesRaw = localStorage.getItem("dateRange");
  const notes: DateRange = JSON.parse(notesRaw ?? "");
  return notes;
});
$dateRange.on(loadDateRangeFx.doneData, (state, payload) => {
  return payload;
});
sample({
  source: $dateRange,
  target: saveDateRange,
});
