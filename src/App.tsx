import React from 'react';
import './App.css';
import GoodTestingRu from "./pdf-template/GoodTestingRu";
import ReactPDF, {PDFDownloadLink} from "@react-pdf/renderer";
import PDFViewer = ReactPDF.PDFViewer;


function App() {
  return (
    <div className="App">
        {/*<PDFDownloadLink document={<GoodTestingRu />} fileName="somename.pdf">*/}
        {/*    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}*/}
        {/*</PDFDownloadLink>*/}
        <PDFViewer style={{
            height: "900px",
            width: "500px"
        }}>
            <GoodTestingRu data={{
                classesCount: 0,
                dateFrom: "June 2023",
                dateTo: "january 2025",
                level: "A1",
                name: "Irina Litvichenko",
                rank: "Beginner",
                score: 100,
                totalScore: 300

            }} />
        </PDFViewer>
    </div>
  );
}

export default App;
