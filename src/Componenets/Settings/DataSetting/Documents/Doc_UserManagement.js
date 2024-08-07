import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function User_Management() {
  const [documents, setDocuments] = useState([]);
  const [partnerDocuments, setPartnerDocuments] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchDocuments = async () => {
    try {
      const URL = `${apiUrl}/emp-professional-documents`;
      const response = await axios.get(URL);
      setDocuments(response.data);
      console.log(response, "response documents");
    } catch (error) {
      setError(error.message);
      // setLoading(false);
    }
  };

  const GetpartnerDocuments = async () => {
    try {
      const URL = `${apiUrl}/partner-documents`;
      const response = await axios.get(URL);
      setPartnerDocuments(response.data);
      console.log(response, "response documents");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDocuments();
    GetpartnerDocuments();
  }, []);

  // const folder = [
  //     {
  //       id: "1",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "2",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "3",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "4",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "5",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "6",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "7",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "8",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "9",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "10",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //   ];

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-y-[2vw] gap-x-[2vw]">
        {/* {folder.map((drive) => ( */}
        <div className="">
          <div className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
            <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[1.5vw] h-[1.5vw]"
                >
                  <path
                    d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                    fill="#1F487C"
                  />
                </svg>
              </div>
              <div className="text-[1.1vw] text-[#8398B7]">
                {/* {drive.file} */} Employee
              </div>
              <div className="text-[0.9vw] text-[#CCCCCC]">
                {documents?.length} files
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
            <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[1.5vw] h-[1.5vw]"
                >
                  <path
                    d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                    fill="#1F487C"
                  />
                </svg>
              </div>
              <div className="text-[1.1vw] text-[#8398B7]">
                {/* {drive.file} */} Partner
              </div>
              <div className="text-[0.9vw] text-[#CCCCCC]">
                {partnerDocuments?.length} files
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
            <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[1.5vw] h-[1.5vw]"
                >
                  <path
                    d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                    fill="#1F487C"
                  />
                </svg>
              </div>
              <div className="text-[1.1vw] text-[#8398B7]">
                {/* {drive.file} */} Operator
              </div>
              <div className="text-[0.9vw] text-[#CCCCCC]">
                {partnerDocuments?.length} files
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}
