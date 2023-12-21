import React from 'react';
import {Button, Popover, Space, Spin, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {Student} from "../../types/students";
import {useUnit} from "effector-react";
import {$students} from "../../store/students";
import GoodTestingRu from "../../pdf-template/GoodTestingRu";
import {$dateRange} from "../../store/dateRange";
import styles from "./StudentsTable.module.css";
import {enNameRegExp, levelRegExp, ruNameRegExp} from "../../helpers/regExp";
import { pdf } from '@react-pdf/renderer';
const FileSaver = require('file-saver');
const StudentsTable = () => {
    const dateRange =  useUnit($dateRange);

    const columns: ColumnsType<Student> = [
        {
            title: '№',
            dataIndex: 'origId',
            key: 'origId',
        },
        {
            title: 'ФИО студента',
            dataIndex: 'name',
            key: 'name',
            render: (value, record, index)=>{
                return ruNameRegExp.test(value) ? value : <span className={styles.errorRow}>{value}</span>
            }
        },
        {
            title: 'FIO ENG',
            dataIndex: 'nameTraslit',
            key: 'nameTraslit',
            render: (value, record, index)=>{
                return enNameRegExp.test(value) ? value : <span className={styles.errorRow}>{value}</span>
            }
        },
        {
            title: 'Уровень теста',
            dataIndex: 'level',
            key: 'level',
            render: (value, record, index)=>{
                return levelRegExp.test(value) ? value : <span className={styles.errorRow}>{value}</span>
            }
        },
        {
            title: 'Итоговый балл',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button onClick={async ()=>{
                            const pdfBuilder = pdf(<GoodTestingRu data={{
                                classesCount: 0,
                                dateFrom: dateRange[0].format("MMMM YYYY"),
                                dateTo: dateRange[1].format("MMMM YYYY"),
                                level: "A1",
                                name: record.nameTraslit,
                                rank: "Beginner",
                                score: 100,
                                totalScore: 300
                            }} />);
                            const pdfBlob = await pdfBuilder.toBlob();
                            FileSaver.saveAs(pdfBlob, `${record.nameTraslit}.pdf`);
                        }}>
                            EN
                        </Button>
                    </Space>
                )
            },
        },
    ];

    const students = useUnit($students);
    return (
        <Table rowKey={"origId"} columns={columns} dataSource={students} />
    );
};

export default StudentsTable;