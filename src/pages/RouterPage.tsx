import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTER } from "../consts/router";
import ImportPage from "./import/ImportPage";
import CertificatePage from "./certificate/CertificatePage";
import DataViewer from "../Components/DataViewer/DataViewer";
const RouterPage = () => {
  return (
    <Routes>
      <Route path={ROUTER.IMPORT.PATH} element={<ImportPage />} />
      <Route path={ROUTER.CERT.PATH} element={<CertificatePage />} />
      <Route path={ROUTER.ROOT.PATH} element={<DataViewer />} />
    </Routes>
  );
};

export default RouterPage;
