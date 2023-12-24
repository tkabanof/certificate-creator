import React, { useMemo } from "react";
import ReactPDF, {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import substrate from "../assets/substrate2.png";
import logo from "../assets/logo.png";

// @ts-ignore
import font from "../assets/fonts/intro_regular.ttf";
// @ts-ignore
import font2 from "../assets/fonts/IntroDemoBlackCaps.woff";
import { articles, Level, Rank } from "../consts/rankings";
import Image = ReactPDF.Image;
import Font = ReactPDF.Font;

Font.register({
  family: "Intro",
  src: font2,
});
Font.register({
  fontStyle: "normal",
  fontWeight: "normal",
  family: "Intro Regular",
  src: font,
});

const styles = StyleSheet.create({
  page: {
    // flexDirection: 'column',
    backgroundColor: "#B0DCF2",
  },
  substrate: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  logo: {
    marginTop: 36,
    width: "244.47px",
    height: "97.37px",
  },
  certificate: {
    marginTop: "83.63px",
    color: "#0080B1",
    fontFamily: "Intro",
    fontSize: "50px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textTransform: "uppercase",
  },
  certify: {
    marginTop: 39,
    color: "#00234E",
    textAlign: "center",
    fontFamily: "Intro Regular",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  name: {
    marginTop: 33,
    color: "#00234E",
    textAlign: "center",
    fontFamily: "Intro Regular",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textTransform: "capitalize",
  },
  hasVisited: {
    paddingHorizontal: "5px",
    marginTop: 39,
    width: "332px",
    color: "#00234E",
    textAlign: "center",
    fontFamily: "Intro Regular",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.5",
  },
  hasBeenAwarded: {
    marginTop: 20,
    width: "360px",
    color: "#00234E",
    textAlign: "center",
    fontFamily: "Intro Regular",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.5",
  },
  hasBeenAwardedAfter: {
    marginTop: "4px",
    width: "360px",
    color: "#00234E",
    textAlign: "center",
    fontFamily: "Intro Regular",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  degree: {
    marginTop: 12,
    color: "#00234E",
    fontFamily: "Intro Regular",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

type CertData = {
  name: string;
  dateFrom: string;
  dateTo: string;
  classesCount: number;
  level: Level;
  rank: Rank;
  score: number;
  totalScore: number;
};

type GoodTestingEnProps = {
  data: CertData;
};
const GoodTestingEn = ({ data }: GoodTestingEnProps) => {
  return useMemo(() => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          >
            <Image style={styles.substrate} src={substrate} />
          </View>
          <View style={styles.container}>
            <Image style={styles.logo} src={logo} />
            <Text style={styles.certificate}>CERTIFICATE</Text>
            <Text style={styles.certify}>This is to certify that</Text>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.hasVisited}>
              {`has visited ${data.classesCount} online English classes from ${data.dateFrom} to ${data.dateTo} and successfully passed the Midterm exam`}
            </Text>
            <Text style={styles.hasBeenAwarded}>
              {`${data.name}  has been awarded a score of ${
                data.score
              } out of ${data.totalScore} and has confirmed ${
                articles[data.rank]
              }`}
            </Text>
            <Text style={styles.degree}>{data.rank}</Text>
            <Text style={styles.hasBeenAwardedAfter}>
              {`of English language proficiency (${data.level})`}
            </Text>
          </View>
        </Page>
      </Document>
    );
  }, [data]);
};

export default GoodTestingEn;
