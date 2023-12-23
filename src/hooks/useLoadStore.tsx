import { useEffect } from "react";
import { loadStudentsFx } from "../store/students";
import { loadDateRangeFx } from "../store/dateRange";

export const useLoadStore = () => {
  useEffect(() => {
    loadStudentsFx();
    loadDateRangeFx();
  }, []);
};
