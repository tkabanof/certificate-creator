import {Students} from "../types/students";

export const isStudents = (value: unknown): value is Students =>{
    return Array.isArray(value)
}