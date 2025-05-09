//import axios from "axios";
import React from "react";
import { MdAutoDelete } from "react-icons/md";
//import { toast } from "react-toastify";
import { Deleteall } from "../../Api/Offers/Offers";
import { useDispatch } from "react-redux";

export default function DeleteList({
  title,
  setDeleteModalIsOpen,
  api,
  module,
  filter,
  setPermission,
  CurrentTab,
  listType
}) {
  // const DeletePromoData = async () => {
  //   const response = await axios.delete(api);
  //   toast.success(response?.data?.message);
  //   setDeleteModalIsOpen(false)
  // };
  const dispatch = useDispatch();
  const handlesubmit = () => {
    setDeleteModalIsOpen(false);
    Deleteall(api, dispatch, module, filter, setPermission, CurrentTab,listType);
  };
  return (
    <div>
      <div className="flex flex-col  justify-center">
        <div className="items-center flex-col flex justify-center mt-[0.5vw]">
          <MdAutoDelete color="#1f4b7f" size={"5vw"} />
          <p className="text-[1.7vw] font-semibold text-[#1f4b7f] mt-[1vw]">
            Are You Sure ?
          </p>
          <p className="text-[1.1vw] text-[#1f4b7f] mt-[0.5vw]">{`${title} ?`}</p>
        </div>
        <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
          <button
            className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw]  h-[3vw]"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            No
          </button>
          <button
            className="bg-[#1f4b7f] text-white font-semibold text-[1.1vw] w-[10vw] h-[3vw] rounded-[0.5vw]"
            // onClick={() => DeletePromoData()}
            onClick={() => handlesubmit()}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
