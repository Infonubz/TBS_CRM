import React, { useEffect, useState } from "react";

const Language = () => {
  const languages = [
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Tulu",
    "Sinhala",
    "Konkani",
    "Bengali",
  ];

  return (
    <div className="bg-gray-50 rounded-b-[1vw] px-[2.5vw]">
      <ul className="list-disc grid grid-cols-4 gap-4 p-2">
        {languages.map((language, index) => (
          <li
            key={index}
            className="text-lg text-gray-800 cursor-pointer hover:bg-[#1F487C] hover:text-white rounded-[0.5vw] transition py-[1vw] px-[0.5vw] duration-200 w-1/2"
          >
            <span className=" ">{language}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Language;
