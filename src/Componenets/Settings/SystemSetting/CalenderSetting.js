import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalenderSetting = () => {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  return (
    <>
      <div className="grid grid-cols-3 py-[3vw] px-[1.5vw] ">
        <div className="col-span-2 flex justify-center">
          <Calendar value={dateState} onChange={changeDate} />
        </div>
        <div className="flex flex-col border-[0.3vw] border-slate-300 rounded-md p-[1vw] space-y-[1vw]">
          <textarea
            name=""
            id=""
            placeholder="Task Details"
            rows="1"
            className="textarea-placeholder h-[2.5vw] rounded-md bg-gray-200 outline-none"
          ></textarea>
          <textarea
            name=""
            id=""
            placeholder="Title"
            rows="1"
            className="textarea-placeholder h-[2.5vw] rounded-md bg-gray-200 outline-none"
          ></textarea>
          <textarea
            name=""
            id=""
            placeholder="Details"
            rows="3"
            className="textarea-placeholder  bg-gray-200 rounded-md outline-none"
          ></textarea>
          <textarea
            name=""
            id=""
            placeholder="Activity Date"
            rows="1"
            className="textarea-placeholder h-[2.5vw] rounded-md bg-gray-200 outline-none"
          ></textarea>
          <textarea
            name=""
            id=""
            placeholder="Priority"
            rows="1"
            className="textarea-placeholder h-[2.5vw] rounded-md bg-gray-200 outline-none"
          ></textarea>
          <div className="grid grid-cols-2 gap-x-[1vw]">
            <button className="w-full h-[2.5vw] bg-[#1F487C] text-white rounded-md">
              SAVE
            </button>
            <button className="w-full h-[2.5vw] bg-[#1F487C] text-white rounded-md">
              EDIT TASK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderSetting;
