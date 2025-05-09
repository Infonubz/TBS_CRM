import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default function Exportgetstaation() {
  const processSOAPResponse = async (soapResponse, name) => {
    try {
      // Step 1: Create a new XMLParser instance
      const parser = new XMLParser({
        ignoreAttributes: true, // Optional: Ignore attributes for simplicity
        parseNodeValue: true, // Ensure node values are parsed as string
        alwaysCreateTextNode: true, // Ensure text nodes are always created
      });

      // Step 2: Parse the SOAP response (XML to JS object)
      const parsedSOAP = parser.parse(soapResponse);

      console.log("Parsed SOAP:", parsedSOAP); // Log the parsed SOAP response

      // Step 3: Extract the JSON string from the parsed response
      // Check if the response exists and then try to access GetStationsResult
      const getStationsResult =
        parsedSOAP["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"]?.[
          `ns1:${name}Response`
        ]?.[`ns1:${name}Result`]?.["#text"];
      console.log("Extracted GetStationsResult:", getStationsResult);

      // Ensure the jsonString is a valid string before trying to parse it
      if (getStationsResult) {
        // Check if it's a JSON string and parse it
        const jsonObject = JSON.parse(getStationsResult);
        console.log("Converted JSON Object:", jsonObject);
        return jsonObject;
      } else {
        console.error("No valid 'GetStationsResult' found in the response");
        return null;
      }
    } catch (error) {
      console.error("Error processing SOAP response:", error);
      return null;
    }
  };
  const [getdata, setgetdata] = useState("");
  // Main function for fetching stations
  const Abhibus_GetStations = async (dispatch) => {
    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="https://staging.abhibus.com/">
            <soap:Body>
              <tns:GetStationsV1>
                <username>demo@test</username>
                <password>demo@abhibus</password>
              </tns:GetStationsV1>
            </soap:Body>
          </soap:Envelope>`;

    const url = `https://staging.abhibus.com/abhiWebServer`;

    try {
      const authHeader = `Basic ${btoa(`demo@test:demo@abhibus`)}`;

      console.log("Request Headers:", {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: '"https://staging.abhibus.com/GetStationsV1"',
      });

      console.log("SOAP Request Body:", soapRequest);

      const response = await axios({
        method: "post",
        url,
        data: soapRequest,
        headers: {
          "Content-Type": "text/xml;charset=UTF-8",
          Authorization: authHeader,
          SOAPAction: '"https://staging.abhibus.com/GetStationsV1"', // Ensure quotes if required
        },
      });

      console.log("SOAP Response:", response.data);
      const result = await processSOAPResponse(response.data, "GetStationsV1");
      console.log(result, "resultresultresultresultresultresult");
      //   dispatch({ type: GET_STATIONS, payload: result?.stations });
      setgetdata(result);
      return result;
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      //   toast.error(error);
      return null;
    }
  };
  useEffect(() => {
    Abhibus_GetStations();
  }, []);
    const exportToExcel = () => {
      if (getdata?.stations?.length === 0) {
        alert("No data to export!");
        return;
      }
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(getdata?.stations);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(excelBlob, "exported_data.xlsx");
    };
  return <div onClick={exportToExcel}>exportgetstaation</div>;
}
