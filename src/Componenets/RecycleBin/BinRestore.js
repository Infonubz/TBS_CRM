import React from "react";
import { MdSettingsBackupRestore } from "react-icons/md";
import { RestoreBinData } from "../../Api/RecycleBin/RecycleBin";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const BinRestore = ({ SetRestoreModalOpen, title, id, tab }) => {
  const dispatch = useDispatch();
  const handlesubmit = async () => {
    const response = await RestoreBinData(dispatch, id, tab);
    toast.success(response);
    SetRestoreModalOpen(false);
  };

  console.log(id, tab, "urlurlurlurl");

  return (
    <div>
      <div>
        <div className="flex flex-col  justify-center">
          <div className="items-center flex-col flex justify-center mt-[0.5vw]">
            <MdSettingsBackupRestore color="#1f4b7f" size={"5vw"} />
            <p className="text-[1.7vw] font-semibold text-[#1f4b7f] mt-[1vw]">
              Are You Sure ?
            </p>
            <p className="text-[1.1vw] text-[#1f4b7f] mt-[0.5vw]">{title}</p>
          </div>
          <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
            <button
              className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw]  h-[3vw]"
              onClick={() => SetRestoreModalOpen(false)}
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
    </div>
  );
};

export default BinRestore;
