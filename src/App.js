import { useState } from "react";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import "./styles.css";
import { getLighthouseReport, getOnPageReport } from "./api";
import LighthouseReport from "./LighthouseReport";
import OnPageReport from "./OnPageReport";
import Progress from "./Progress";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryArr, setCategoryArr] = useState([]);
  const [onPageData, setOnPageData] = useState({});
  const [error, setError] = useState(null);

  async function getReport(url) {
    try {
      setLoading(true);
      const lightHouseData = await getLighthouseReport(url);
      setCategoryArr(lightHouseData);
      const onPageResult = await getOnPageReport(url);
      setOnPageData(onPageResult);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  }

  return (
    <ChakraProvider>
      <div className="App">
        <h1>Get your website analytics</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="enter website url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="button" onClick={() => getReport(input)}>
            Get Analytics
          </button>
        </div>
        <div className="progress-container">
          {loading && (
            <div>
              <h1>Getting Results...wait some time...</h1>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          )}
          {error && <h1>Some Error Occured.</h1>}
        </div>

        {categoryArr.length > 0 && Object.values(onPageData).length > 0 && (
          <div>
            <h2>Analytics for ${input}</h2>
            <Progress onPageData={onPageData} categoryArr={categoryArr} />
            <OnPageReport onPageData={onPageData} />
            <LighthouseReport categoryArr={categoryArr} />
          </div>
        )}
      </div>
    </ChakraProvider>
  );
}
