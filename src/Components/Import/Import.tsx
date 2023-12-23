import React, { useState } from "react";
import styles from "./Import.module.css";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { setStudents } from "../../store/students";
import { parser } from "../../helpers/parcer";
import { ROUTER } from "../../consts/router";

const Import = () => {
  const [errors, setErrors] = useState<string>();
  const navigate = useNavigate();
  const onFilePick: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files;
    if (file !== null) {
      const file1 = file[0];
      Papa.parse(file1, {
        complete: (results) => {
          if (results.errors.length > 0) {
            setErrors(results.errors.toString());
          }
          // @ts-ignore
          setStudents(parser(results.data));
          // @ts-ignore
          console.log(parser(results.data));
          navigate(`${ROUTER.ROOT.PATH}`);
        },
      });
    }
  };

  return (
    <div>
      <div className={styles.fileInput}>
        <label htmlFor="data">Выберете файл</label>
        <input
          multiple={false}
          type="file"
          id="avatar"
          name="data"
          accept=".csv"
          onChange={onFilePick}
        />
      </div>
      <div>
        {errors !== undefined && (
          <div>
            <div>Ошибки</div>
            <div>{errors}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Import;
