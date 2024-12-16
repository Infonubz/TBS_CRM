import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import TempAddress from "./TempAddress";
import PerAddress from "./PerAddress";
import { Checkbox, Spin } from "antd";
import { GetPatAddressById } from "../../../Api/UserManagement/Partner";
import { GetEmpAddressById } from "../../../Api/UserManagement/Employee";
import umbuslogo from "../../../asserts/umbuslogo.png"

const AddressIndex = ({
  proffesionaback,
  setAddressBack,
  setCurrentpage,
  addressback,
  setPartnerID, 
  EmployeeID,
  setEmployeeID,
  updatedata
}) => {
  const [selected, setSelected] = useState(1);
  const [toggle,setToggle] = useState(false)
  const [checkBox, setCheckBox] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [enable, setEnable] = useState();
  const [currentValues, setCurrentValues] = useState({
    address: "",
    state: "",
    region: "",
    phone: "",
    city: "",
    country: "",
    postalcode: "",
  });
  const [perAddress, setPerAddress] = useState({
    address: "",
    state: "",
    region: "",
    phone: "",
    city: "",
    country: "",
    postalcode: "",
  });
  const [empaddressdata, setEmpAddressData] = useState("");

  console.log(currentValues,"datadgfadjgdkfjg");
  

  const fetchGetUser = async () => {
    try {
      const data = await GetEmpAddressById(
        EmployeeID,
        setEmployeeID,
        setEmpAddressData,
        setSpinning
      );
      setEmpAddressData(data);
      console.log(data,"dfdkf");
      
       setCurrentValues({
        address: data.temp_add,
        state: data.temp_state,
        region: data.temp_region,
        city: data.temp_city,
        country: data.temp_country,
        postalcode: data.temp_zip_code,
      });
      setPerAddress({
        address: data.perm_add,
        state: data.perm_state,
        region: data.perm_region,
        city: data.perm_city,
        country: data.perm_country,
        postalcode: data.perm_zip_code,
      })
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (EmployeeID != null || proffesionaback) {
      fetchGetUser();
      setSpinning(true)
      setEnable(false)
    }
  }, [EmployeeID, setEmployeeID, setEmpAddressData, proffesionaback]);

  return (
    <div className="mt-[1.5vw] relative">
        <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center z-[1]"><img className="" src={umbuslogo} alt="buslogo"/></div>
      <div className="border-l-[0.1vw]   px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[3vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Registered Address
          </label>
          {/* {PartnerID || proffesionaback ? (
            <button
              className={`${
                enable
                  ? "bg-[#1f4b7f] text-white"
                  : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
              } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => setEnable(!enable)}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )} */}
           {updatedata && empaddressdata?.perm_add != null || proffesionaback ? (
            <button
              className={`${
                enable
                  ? "bg-[#1f4b7f] text-white"
                  : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
              } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => setEnable(!enable)}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-center">
          <button
            className={`h-[2.5vw] w-[16.6vw] border-[.1vw] text-[1.1vw] rounded-l-[.3vw] border-[#1f4b7f] ${
              selected === 1
                ? "bg-[#1f4b7f] text-white"
                : "bg-white text-[#1f4b7f]"
            } px-[1vw]`}
            onClick={() => setSelected(1)}
          >
            Temporary Address
          </button>
          {/* <button
            className={`h-[2.5vw] w-[16.6vw] border-[.1vw]  text-[1.1vw] rounded-r-[.3vw] border-[#1f4b7f] ${
              selected === 2
                ? "bg-[#1f4b7f] text-white"
                : "bg-white text-[#1f4b7f]"
            }  ${toggle === false ?"cursor-not-allowed":"cursor-not-allowed"}px-[1vw]`}
            onClick={() => {
                setSelected(2)
            }}
          >
            Permanent Address
          </button> */}
          <button
  className={`h-[2.5vw] w-[16.6vw] border-[.1vw] text-[1.1vw] rounded-r-[.3vw] border-[#1f4b7f] ${
    selected === 2
      ? "bg-[#1f4b7f] text-white"
      : "bg-white text-[#1f4b7f]"
  } 
  ${toggle === false ? "cursor-not-allowed" : "cursor-pointer"}
   px-[1vw]`}
  onClick={() => {
    if (toggle) {
    }
    setSelected(2);
  }}
  disabled={toggle === false} // Disable the button if toggle is false
>
  Permanent Address
</button>
        </div>
        {spinning ? (
              <div className=" flex justify-center h-[22vw] items-center">
                <Spin size="large" />
              </div>
            ) : (
        <>
             <Checkbox className={`${selected === 1 ? "":"hidden"} text-[#1F4B7F] font-semibold text-[.9vw] mt-[.5vw]`}
          onChange={() => setCheckBox(!checkBox)}
          disabled={EmployeeID || proffesionaback || updatedata ? (EmployeeID && enable == false && updatedata == "" ? false :  enable ? false :empaddressdata.perm_add == null ? false : true) : false}
          // disabled={PartnerID || proffesionaback || updatedata ? (PartnerID &&  enable == false && updatedata == "" ? false : enable ? false : true) : false}
          // onChange={(e) => {
          //   if (e.target.checked) {
          //     setFieldValue("temp_address", values.temp_address);
          //     setFieldValue("temp_country", values.temp_country);
          //     setFieldValue("temp_state", values.temp_state);
          //     setFieldValue("temp_city", values.temp_city);
          //     setFieldValue("temp_postal", values.temp_postal);
          //   } else {
          //     setFieldValue("temp_address", "");
          //     setFieldValue("temp_country", "");
          //     setFieldValue("temp_state", "");
          //     setFieldValue("temp_city", "");
          //     setFieldValue("temp_postal", "");
          //   }
          // }}

        
        >
          Temporary Address same as Permanent Address
        </Checkbox>

        {selected === 1 ? (
          <TempAddress
            currentValues={currentValues}
            setCurrentValues={setCurrentValues}
            perAddress={perAddress}
            setPerAddress={setPerAddress}
            setAddressBack={setAddressBack}
            setCurrentpage={setCurrentpage}
            addressback={addressback}
            setSelected={setSelected}
            setToggle={setToggle}
            checkBox={checkBox}
            setCheckBox={setCheckBox}
            empaddressdata={empaddressdata}
            enable={enable}
            proffesionaback={proffesionaback}
            EmployeeID={EmployeeID}
            updatedata={updatedata}
          />
        ) : (
          <PerAddress
            perAddress={perAddress}
            setAddressBack={setAddressBack}
            setCurrentpage={setCurrentpage}
            addressback={addressback}
            currentValues={currentValues}
            empaddressdata={empaddressdata}
            enable={enable}
            proffesionaback={proffesionaback}
            EmployeeID={EmployeeID} 
            updatedata={updatedata} 
          />
        )}
        </>
            )}
      </div>
    </div>
  );
};

export default AddressIndex;
