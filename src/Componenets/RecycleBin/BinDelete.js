import React from "react";
import {
  MdAutoDelete,
  MdDeleteForever,
  MdSettingsBackupRestore,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { DeleteBinData } from "../../Api/RecycleBin/RecycleBin";
import { toast } from "react-toastify";
const BinDelete = ({ setDeleteModalOpen, title, id, tab }) => {
  const dispatch = useDispatch();

  const handlesubmit = async () => {
    const response = await DeleteBinData(dispatch, id, tab);
    toast.success(response);
    setDeleteModalOpen(false);
  };
  return (
    <div>
      <div>
        <div className="flex flex-col  justify-center">
          <div className="items-center text-center flex-col flex justify-center mt-[0.5vw]">
            <MdDeleteForever color="#1f4b7f" size={"5vw"} />
            <p className="text-[1.7vw] font-semibold text-[#1f4b7f] mt-[1vw]">
              Are You Sure ?
            </p>
            <p className="text-[1.1vw] text-[#1f4b7f] mt-[0.5vw]">{title}</p>
          </div>
          <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
            <button
              className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw]  h-[3vw]"
              onClick={() => setDeleteModalOpen(false)}
            >
              No
            </button>
            <button
              className="bg-[#1f4b7f] text-white font-semibold text-[1.1vw] w-[10vw] h-[3vw] rounded-[0.5vw]"
              onClick={() => handlesubmit()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinDelete;
