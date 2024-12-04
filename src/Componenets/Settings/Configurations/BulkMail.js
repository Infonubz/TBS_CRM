import { Input } from "antd";
import Modal from "react-modal";
import { ErrorMessage, Field, Formik } from "formik";
import CustomEditor from "./CustomEditor";
import { FaRegSave } from "react-icons/fa";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  GetAllEmail,
  GetFromMail,
  postBulkMail,
} from "../../../Api/Settings/Configuration/BulkMail";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu, IoMdSend } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const BulkMail = () => {
  const [body, setBody] = useState("");
  const [subValidation, setSubValidation] = useState(false);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [operatorChecked, setOperatorChecked] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toMailOption, setToMailOption] = useState("");
  const [fromMail, setFromMail] = useState("");
  const [view, setView] = useState("operator");

  const optionEmail = useSelector((state) => state.crm.get_all_operator_email);

  // console.log(getallemail, "mail list");
  // toMailOption.map(val=>{
  //   console.log(val.emailid,"this is mapped")
  // })
//   let email_id = "emailid";

// // Iterate over each object in the array and change the key
// optionEmail.forEach(item => {
//     // Check if the old key exists in the object
//     if (item.hasOwnProperty("email_id")) {
//         // Change the key
//         item[email_id] = item.email_id;
//         delete item.email_id;
//     }
// });

let emailid = "emailid";

// Iterate over each object in the array and change the key
optionEmail.forEach(item => {
    // Check if the old key exists in the object
    if (item.hasOwnProperty("email_id")) {
        // Change the key
        item[emailid] = item.email_id;
        delete item.email_id;
    }
});

  console.log(optionEmail, "i got the from mail");

  const validationSchema = Yup.object().shape({
    // from_mail: Yup.string()
    //   .email("Invalid email format")
    //   .required("Enter the From Mail"),
    to_mail: Yup.string().required("Select the To Mail"),
    subject: Yup.string().required("Subject is required"),
  });

  // const optionEmail = [
  //   { tbs_operator_id: 'tbs-op1103', emailid: 'manojchandran444@gmail.com' },
  //   { tbs_operator_id: 'tbs-op1104', emailid: 'hari@gmail.com' },
  //   { tbs_operator_id: 'tbs-op1101', emailid: 'amala@gmail.com' },
  //   { tbs_operator_id: 'tbs-op1090', emailid: 'ashikayesudhas2001@gmail.com' },
  //   { tbs_operator_id: 'tbs-op1105', emailid: 'viru@gmail.com' }
  // ];

  const handleMailCheckbox = (event, itemId) => {
    const { checked } = event.target;
    setOperatorChecked((prevState) => ({
      ...prevState,
      [itemId]: checked,
    }));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    GetAllEmail(dispatch,setToMailOption,view);
    GetFromMail(setFromMail);
  }, [view,setView]);

  // const handleSelectAll = (event) => {
  //   const { checked } = event.target;
  //   setSelectAll(checked);
  //   setOperatorChecked(
  //     optionEmail.reduce((acc, { emailid }) => {
  //       acc[emailid] = checked;
  //       return acc;
  //     }, {})
  //   );
  // };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);

    const newOperatorChecked = Array.isArray(optionEmail)
      ? optionEmail.reduce((acc, { emailid }) => {
          acc[emailid] = checked;
          return acc;
        }, {})
      : {}; // Return an empty object if optionEmail is not an array

    setOperatorChecked(newOperatorChecked);
  };

  const printSelectedValues = (setFieldValue) => {
    const selectedEmails = Object.keys(operatorChecked).filter(
      (key) => operatorChecked[key]
    );
    console.log("Selected Values:", selectedEmails);

    setIsModalOpen(false);
    if (selectedEmails.length === 0) {
      setFieldValue("to_mail", "");
    } else {
      const selectedEmailLabels = optionEmail
        .filter(({ emailid }) => selectedEmails.includes(emailid))
        .map(({ emailid }) => emailid);
      setFieldValue("to_mail", `${selectedEmailLabels.length} Mails selected`);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("I AM", body);
    if (body === "") {
      setSubValidation(true);
    } else {
      postBulkMail(
        values,
        Object.keys(operatorChecked).filter((key) => operatorChecked[key]),
        body,
        view
      );
      console.log("All Form values:", values);
      console.log("Editor values:", body);
      console.log(
        "Selected Email Values:",
        Object.keys(operatorChecked).filter((key) => operatorChecked[key])
      );
      setSubValidation(false);
      alert("values submitted");

      resetForm();
      setBody("");
      setOperatorChecked({});
      setSelectAll(false);
      setSearchTerm("");
      // setIsModalOpen(false);
    }
  };

  const filteredOptions = Array.isArray(optionEmail)
    ? optionEmail.filter((email) =>
        email?.emailid?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : [];

  console.log(optionEmail, "option_Email");

  const handleCancel = (setFieldValue) => {
    setFieldValue("to_mail", "");
    setSelectAll(false);
    setIsModalOpen(false);
    setOperatorChecked({});
  };

  return (
    <div className="max-h-[29vw] overflow-auto">
      <div className="flex justify-end mx-[1.5vw] mt-[1vw]">
        <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
          <button
            className={`${
              view === "operator" ? "bg-[#1F4B7F]" : "bg-white"
            } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw] rounded-bl-[0.3vw]`}
            style={{
              transition: "all 1s",
            }}
            onClick={() => setView("operator")}
          >
            <span>
              {/* Replace IoMdMenu with an appropriate icon if needed */}
              {/* <IoMdMenu
                size={"1.2vw"}
                color={`${view === "operator" ? "white" : "#1F4B7F"}`}
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2vw"
                height="1.2vw"
                viewBox="0 0 24 24"
              >
                <path
                  fill={`${view === "operator" ? "#FFF" : "#1F487C"}`}
                  fill-rule="evenodd"
                  d="M12 2C8.229 2 6.343 2 5.172 3.172C4.108 4.235 4.01 5.886 4 9H3a1 1 0 0 0-1 1v1a1 1 0 0 0 .4.8L4 13c.01 3.114.108 4.765 1.172 5.828c.242.243.514.435.828.587V21a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-1.018C10.227 20 11.054 20 12 20s1.773 0 2.5-.018V21a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-1.585a3 3 0 0 0 .828-.587C19.892 17.765 19.991 16.114 20 13l1.6-1.2a1 1 0 0 0 .4-.8v-1a1 1 0 0 0-1-1h-1c-.01-3.114-.108-4.765-1.172-5.828C17.657 2 15.771 2 12 2M5.5 9.5c0 1.414 0 2.121.44 2.56c.439.44 1.146.44 2.56.44h7c1.414 0 2.121 0 2.56-.44c.44-.439.44-1.146.44-2.56V7c0-1.414 0-2.121-.44-2.56C17.622 4 16.915 4 15.5 4h-7c-1.414 0-2.121 0-2.56.44C5.5 4.878 5.5 5.585 5.5 7zm.75 6.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m11.5 0a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 .75-.75"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span
              className={`${
                view === "operator" ? "text-white" : "text-[#1F4B7F]"
              } text-[1.1vw]`}
            >
              Operator
            </span>
          </button>
          <button
            className={`${
              view === "passenger" ? "bg-[#1F4B7F]" : "bg-white"
            } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
            style={{
              transition: "all 1s",
            }}
            onClick={() => setView("passenger")}
          >
            <span>
              {/* Replace IoGrid with an appropriate icon if needed */}
              {/* <IoGrid
                size={"1.2vw"}
                color={`${view === "passenger" ? "white" : "#1F4B7F"}`}
              /> */}
              <FaUsers
                size={"1.2vw"}
                color={`${view === "passenger" ? "white" : "#1F4B7F"}`}
              />
            </span>
            <span
              className={`${
                view === "passenger" ? "text-white" : "text-[#1F4B7F]"
              } text-[1.1vw]`}
            >
              passenger
            </span>
          </button>
        </div>
      </div>
      <Formik
        initialValues={{
          from_mail: fromMail || "",
          to_mail: "",
          subject: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, resetForm }) => (
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col px-[3vw] pt-[2vw]">
              <div className="relative">
                <Field
                  type="text"
                  name="from_mail"
                  placeholder="From"
                  value={fromMail}
                  className="border-b-2 w-full border-[#1F487C] placeholder-blue text-[#1F487C] text-[1.2vw] h-[3.2vw] rounded-none outline-none"
                  readOnly
                />
                <ErrorMessage
                  name="from_mail"
                  component="div"
                  className="text-red-500 text-sm absolute bottom-[-1.2vw]"
                />
              </div>

              <div className="mt-[1vw] relative">
                <Field
                  type="text"
                  name="to_mail"
                  placeholder="To"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="border-b-2 w-full border-[#1F487C] placeholder-blue text-[#1F487C] text-[1.2vw] h-[3.2vw] rounded-none outline-none"
                  readOnly
                />
                <ErrorMessage
                  name="to_mail"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw]"
                />
              </div>

              <div className="bmail">
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setIsModalOpen(false)}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                      width: "60vw",
                      height: "34vw",
                      margin: "auto",
                      padding: "0px",
                    },
                  }}
                >
                  <h1 className="border-l-[0.4vw] pl-[0.6vw] pt-[0.25vw] text-[1.5vw] border-[#1F487C] text-[#1F487C]">
                    Email List
                  </h1>
                  <div className="p-[1vw]">
                    <Input
                      prefix={<CiSearch size={"1vw"} />}
                      placeholder="Search"
                      className="mb-[0.6vw] text-[1vw] h-[2vw]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center mb-[1vw]">
                      <input
                        type="checkbox"
                        className="w-[1.2vw] h-[1.2vw] mr-[0.5vw]"
                        onChange={handleSelectAll}
                        checked={selectAll}
                      />
                      <span className="text-[1vw] text-[#1F487C]">
                        Select All
                      </span>
                    </div>
                    <div className="h-[20vw] w-full overflow-x-auto overflow-y-hidden">
                      <div className="flex flex-col">
                        <div className="flex flex-wrap">
                          <div className="h-[20vw] w-full grid grid-flow-col grid-rows-10 pb-[1vw] overflow-x-auto overflow-y-hidden">
                            {filteredOptions.map((val) => (
                              <div
                                className="flex items-center mx-[1vw] my-[0.5vw]"
                                key={val.tbs_operator_id}
                              >
                                <input
                                  type="checkbox"
                                  className="w-[1.2vw] h-[1.2vw] mr-[0.5vw]"
                                  onChange={(e) =>
                                    handleMailCheckbox(e, val.emailid)
                                  }
                                  checked={
                                    operatorChecked[val.emailid] || false
                                  }
                                />
                                <span className="pt-[0.2vw] text-[1vw] text-[#1F487C]">
                                  {val.emailid}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-[1vw] text-right">
                    <button
                      onClick={() => handleCancel(setFieldValue)}
                      className="bg-[#1F4B7F] px-[1vw] py-[.5vw] rounded-md text-white mr-[2vw]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => printSelectedValues(setFieldValue)}
                      className="bg-[#1F4B7F] px-[1vw] py-[.5vw] rounded-md text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </Modal>
              </div>
              <div className="mt-[1vw] relative">
                <Field
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="border-b-2 w-full border-[#1F487C] placeholder-blue text-[#1F487C] text-[1.2vw] h-[3.2vw] rounded-none outline-none"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw]"
                />
              </div>
            </div>
            <div className="py-[2vw] px-[3vw]">
              <label
                htmlFor="Compose Mail"
                className="text-[#1F4B7F] font-medium text-[1.4vw]"
              >
                Compose Mail
              </label>
              <div className="relative">
                <CustomEditor name="subject" body={body} setBody={setBody} />
                <div className="absolute bottom-0 right-0 px-[2vw] py-[1vw]">
                  {/* <button
                    type="submit"
                    className="bg-[#1F4B7F] px-[1vw] py-[.5vw] rounded-md text-white flex items-center gap-[0.5vw]"
                  >
                    <FaRegSave />
                    <span>Submit</span>
                  </button> */}
                  <button
                    type="submit"
                    className="absolute bottom-[1vw] right-[1.5vw] bg-[#1F487C] px-[0.5vw] rounded-full w-[7.5vw] h-[2.25vw]"
                  >
                    <div className="flex items-center justify-center gap-[0.75vw]">
                      <span className="text-[1vw] text-white font-semibold">
                        Send{" "}
                      </span>{" "}
                      <span>
                        <IoMdSend size="1vw" color="white" />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              {subValidation ? (
                <p className="text-red-500 text-sm">ComposeMail is required</p>
              ) : (
                ""
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BulkMail;
