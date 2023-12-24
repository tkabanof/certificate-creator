import React from "react";
import {
  Button,
  InputNumber,
  Popover,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Sex, Student } from "../../types/students";
import { useUnit } from "effector-react";
import {
  $students,
  changeLevel,
  changeScore,
  changeSex,
} from "../../store/students";
import GoodTestingRu from "../../pdf-template/GoodTestingRu";
import { $dateRange } from "../../store/dateRange";
import styles from "./StudentsTable.module.css";
import { enNameRegExp, levelRegExp, ruNameRegExp } from "../../helpers/regExp";
import { pdf } from "@react-pdf/renderer";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
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
        return ruNameRegExp.test(value) ? (
          value
        ) : (
          <span className={styles.errorRow}>{value}</span>
        );
      },
    },
    {
      title: "FIO ENG",
      dataIndex: "nameTraslit",
      key: "nameTraslit",
      render: (value, record, index) => {
        return enNameRegExp.test(value) ? (
          value
        ) : (
          <span className={styles.errorRow}>{value}</span>
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
            value={value}
            style={{ width: 120 }}
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
            status={isNaN(+value) ? "error" : ""}
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
      title: "Действия",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={async () => {
                const pdfBuilder = pdf(
                  <GoodTestingRu
                    data={{
                      classesCount: 0,
                      dateFrom: dateRange[0].format("MMMM YYYY"),
                      dateTo: dateRange[1].format("MMMM YYYY"),
                      level: "A1",
                      name: record.nameTraslit,
                      rank: "Beginner",
                      score: 100,
                      totalScore: 300,
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
