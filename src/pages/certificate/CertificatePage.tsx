import React from "react";
import GoodTestingRu from "../../pdf-template/GoodTestingRu";
import ReactPDF from "@react-pdf/renderer";
import PDFViewer = ReactPDF.PDFViewer;

const CertificatePage = () => {
  return (
    <div>
      <PDFViewer
        style={{
          height: "900px",
          width: "500px",
        }}
      >
        <GoodTestingRu
          data={{
            classesCount: 0,
            dateFrom: "June 2023",
            dateTo: "january 2025",
            level: "A1",
            name: "Irina Litvichenko",
            rank: "Beginner",
            score: 100,
            totalScore: 300,
          }}
        />
      </PDFViewer>
    </div>
  );
};

export default CertificatePage;
