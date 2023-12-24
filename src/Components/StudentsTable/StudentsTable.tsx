import React from "react";
import {
  Button,
  Input,
  InputNumber,
  Popover,
  Segmented,
  Select,
  Space,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Sex, Student } from "../../types/students";
import { useUnit } from "effector-react";
import {
  $students,
  changeEnName,
  changeLevel,
  changeRuName,
  changeScore,
  changeSex,
  changeVisitedClassesCount,
} from "../../store/students";
import GoodTestingRu from "../../pdf-template/GoodTestingRu";
import { $dateRange } from "../../store/dateRange";
import {
  enNameRegExp,
  levelRegExp,
  ruNameRegExp,
  scoreRegExp,
} from "../../helpers/regExp";
import { pdf } from "@react-pdf/renderer";
import {
  ExclamationCircleOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { engLevels } from "../../consts/rankings";
const FileSaver = require("file-saver");
const StudentsTable = () => {
  const dateRange = useUnit($dateRange);

  const columns: ColumnsType<Student> = [
    {
      title: "№",
      dataIndex: "origId",
      key: "origId",
    },
    {
      title: "Пол",
      dataIndex: "sex",
      key: "sex",
      render: (value, record) => {
        return (
          <Segmented
            onChange={(value) => {
              changeSex({ sex: value as Sex, studentId: record.id });
            }}
            value={value}
            options={[
              { value: "male", icon: <ManOutlined /> },
              { value: "female", icon: <WomanOutlined /> },
            ]}
          />
        );
      },
    },
    {
      title: "ФИО студента",
      dataIndex: "name",
      key: "name",
      render: (value, record, index) => {
        return (
          <Input
            status={ruNameRegExp.test(value) ? "" : "error"}
            value={value}
            onChange={(value) => {
              changeRuName({
                name: value.currentTarget.value,
                studentId: record.id,
              });
            }}
          />
        );
      },
    },
    {
      title: "FIO ENG",
      dataIndex: "nameTraslit",
      key: "nameTraslit",
      render: (value, record, index) => {
        return (
          <Input
            status={enNameRegExp.test(value) ? "" : "error"}
            value={value}
            onChange={(value) => {
              changeEnName({
                nameTranslit: value.currentTarget.value,
                studentId: record.id,
              });
            }}
          />
        );
      },
    },
    {
      title: "Уровень теста",
      dataIndex: "level",
      key: "level",
      render: (value, record, index) => {
        return (
          <Select
            status={value === undefined ? "error" : ""}
            value={value}
            style={{ width: 200 }}
            onChange={(value, option) => {
              changeLevel({
                engLevel: value,
                studentId: record.id,
              });
            }}
            options={engLevels.map((level) => {
              return {
                label: `${level.level} (${level.rank})`,
                value: level.id,
              };
            })}
          />
        );
      },
    },
    {
      title: "Итоговый балл",
      dataIndex: "score",
      key: "score",
      render: (value, record) => {
        return (
          <InputNumber
            status={isNaN(+value) || !scoreRegExp.test(value) ? "error" : ""}
            value={value}
            onChange={(val) => {
              changeScore({
                score: val,
                studentId: record.id,
              });
            }}
          />
        );
      },
    },
    {
      title: "Посещено занятий",
      dataIndex: "classesVisited",
      key: "classesVisited",
      render: (value, record) => {
        return (
          <InputNumber
            status={isNaN(+value) ? "error" : ""}
            value={value}
            onChange={(val) => {
              changeVisitedClassesCount({
                visitedClasses: +val,
                studentId: record.id,
              });
            }}
          />
        );
      },
    },
    {
      title: "Действия",
      key: "action",
      render: (_, record) => {
        const error =
          [record.level === undefined, isNaN(Number(record.score))].find(
            Boolean,
          ) ?? false;
        if (error) {
          return (
            <Popover
              content={
                <div>
                  {record.level === undefined && (
                    <div>Неверный уровень теста</div>
                  )}
                  {isNaN(Number(record.score)) && (
                    <div>Неверный итоговый бал</div>
                  )}
                </div>
              }
              title="Ошибка"
            >
              <ExclamationCircleOutlined />
            </Popover>
          );
        }
        return (
          <Space size="middle">
            <Button
              onClick={async () => {
                console.log(record);
                const pdfBuilder = pdf(
                  <GoodTestingRu
                    data={{
                      classesCount: record.classesVisited,
                      dateFrom: dateRange[0].format("MMMM YYYY"),
                      dateTo: dateRange[1].format("MMMM YYYY"),
                      level: engLevels[record.level ?? -1].level,
                      name: record.nameTraslit,
                      rank: engLevels[record.level ?? -1].rank,
                      score: +record.score,
                      totalScore: engLevels[record.level ?? -1].maxScore,
                    }}
                  />,
                );
                const pdfBlob = await pdfBuilder.toBlob();
                FileSaver.saveAs(pdfBlob, `${record.nameTraslit}.pdf`);
              }}
            >
              EN
            </Button>
          </Space>
        );
      },
    },
  ];

  const students = useUnit($students);
  return <Table rowKey={"id"} columns={columns} dataSource={students} />;
};

export default StudentsTable;
