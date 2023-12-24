import React, { useState } from "react";
import StudentsTable from "../StudentsTable/StudentsTable";
import Import from "../Import/Import";
import { Button, DatePicker, Modal } from "antd";
import { $dateRange, setDateRange } from "../../store/dateRange";
import { useUnit } from "effector-react/effector-react.umd";
import style from "./DataViewer.module.css";

const { RangePicker } = DatePicker;
const DataViewer = () => {
  const dataRange = useUnit($dateRange);
  const [isOpen, setIsOpen] = useState(false);
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Modal
        title="Импорт"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Import />
      </Modal>
      <div className={style.header}>
        <RangePicker
          value={dataRange}
          picker="month"
          onChange={(dateRange) => {
            if (
              dateRange !== null &&
              dateRange[0] !== null &&
              dateRange[1] !== null
            ) {
              setDateRange([dateRange[0], dateRange[1]]);
            }
          }}
        />
        <Button
          type={"primary"}
          onClick={() => {
            setIsOpen((prevState) => {
              return !prevState;
            });
          }}
        >
          Импорт
        </Button>
      </div>
      <div>
        <StudentsTable />
      </div>
    </div>
  );
};

export default DataViewer;
