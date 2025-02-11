import { useDispatch } from "react-redux";
import {
  GetRequestManagementData,
  userStatusActivate,
} from "../../Api/RequestManagement/RequestManagement";
import image from "../../asserts/direction.png";
import { Spin } from "antd";

const TableListStatusChange = ({ statusId, userId, setStatusModal,setSpinning}) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    setSpinning(true)
    userStatusActivate(statusId, userId, dispatch,setSpinning);
    // GetRequestManagementData(dispatch);
    console.log("call 1");
    setStatusModal(false);
  };
  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[1.5vw] font-bold ">Update the status of Operator</p>
          <img src={image} className="h-[6vw] w-[6vw] mt-[1vw] "></img>
        </div>
        <div className="flex justify-around mt-[1vw]">
          <button
            className={`text-[1vw] text-white shadow-md font-extrabold shadow-black  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] ${statusId === 2 ? "bg-[#FD3434]":"bg-[#34AE2B]"} rounded-[0.5vw]`}
            onClick={handleClick}
          >
           {statusId === 2 ? "Inactive" : "Active"}
          </button>
          {/* <button
            className=" text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF6B00] rounded-[0.5vw]"
          >
            Inactive
          </button> */}
        </div>
        {/* <div className="text-red-500 text-[1.2vw] text-center pt-[.5vw]">
          You can't make this <span className="text-green-600"> Active </span>
          again
        </div> */}
      </div>
    </div>
  );
};

export default TableListStatusChange;
