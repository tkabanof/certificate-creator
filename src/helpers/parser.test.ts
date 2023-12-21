import {parser} from "./parcer";

const testData = [
    [
        "Сводная таблица баллов студентов, сдавших промежуточный тест (май 2023)",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
    [
        ""
    ],
    [
        "№",
        "ФИО преподавателя",
        "ФИО студента ",
        "Уровень теста",
        "Итоговый балл",
        "Примечания (если есть)",
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "1",
        "Красикова ЕН",
        "Ходусов Николай ",
        "С1 (Advanced) ",
        "58",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "2",
        "Красикова ЕН",
        "Калиниченко Елена ",
        "С1 (Advanced) ",
        "41",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "3",
        "Красикова ЕН",
        "Гунина Диана ",
        "С1 (Advanced) ",
        "53",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
]
describe("parser", ()=>{
    it("should return empty array", ()=>{
        expect(parser([])).toEqual([]);
    });
    it("should return not empty array", ()=>{
        expect(parser(testData)).toEqual([
            {
                origId: "1",
                name: "Ходусов Николай",
                nameTraslit: "Khodusov Nikolai",
                level: "С1 (Advanced) ",
                score: 58
            },
            {
                origId: "2",
                name: "Калиниченко Елена",
                nameTraslit: "Kalinichenko Yelena",
                level: "С1 (Advanced) ",
                score: 41
            },
            {
                origId: "3",
                name: "Гунина Диана",
                nameTraslit: "Gunina Diana",
                level: "С1 (Advanced) ",
                score: 53
            }
        ]);
    });
})

