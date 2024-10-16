import { useDispatch } from "react-redux";
import {
  GetRequestManagementData,
  userStatusActivate,
} from "../../Api/RequestManagement/RequestManagement";
import image from "../../asserts/direction.png";

const TableListStatusChange = ({ statusId, userId, setStatusModal }) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    userStatusActivate("inactive", userId, dispatch);
    GetRequestManagementData(dispatch);
    console.log("call 1");
    setStatusModal(false);
  };
  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[1.5vw] ">Update the status of Operator</p>
          <img src={image} className="h-[6vw] w-[6vw] mt-[1vw]"></img>
        </div>
        <div className="flex justify-around mt-[1vw]">
          <button
            className=" text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw]"
            onClick={handleClick}
          >
            Inactive
          </button>
          {/* <button
            className=" text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF6B00] rounded-[0.5vw]"
          >
            Inactive
          </button> */}
        </div>
        <div className="text-red-500 text-[1.2vw] text-center pt-[.5vw]">
          You can't make this <span className="text-green-600"> Active </span>
          again
        </div>
      </div>
    </div>
  );
};

export default TableListStatusChange;
