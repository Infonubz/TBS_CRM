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
import { toast } from "react-toastify";

const BulkMail = () => {
  const [body, setBody] = useState("");
  const [subValidation, setSubValidation] = useState(false);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [operatorChecked, setOperatorChecked] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toMailOption, setToMailOption] = useState("");
  const [toMail, setToMail] = useState();
  console.log(toMail, "to_mail");
  const [fromMail, setFromMail] = useState("");
  const [view, setView] = useState("operator");

  const optionEmail = useSelector((state) => state.crm.get_all_operator_email);
  console.log(optionEmail, "option email")

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
  if (!optionEmail.error) {optionEmail.forEach((item) => {
    // Check if the old key exists in the object
    if (item.hasOwnProperty("email_id")) {
      // Change the key
      item[emailid] = item.email_id;
      delete item.email_id;
    }
  })
}

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
    GetAllEmail(dispatch, setToMailOption, view);
    GetFromMail(setFromMail);
  }, [view, setView]);

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
    setToMail(selectedEmails);
    setIsModalOpen(false);
    if (selectedEmails.length === 0) {
      setFieldValue("to_mail", "");
    } else {
      const selectedEmailLabels = optionEmail
        .filter(({ emailid }) => selectedEmails.includes(emailid))
        .map(({ emailid }) => emailid);

      if (selectedEmailLabels.length === 1) {
        setFieldValue("to_mail", `${selectedEmailLabels[0]}`);
        console.log(
          selectedEmailLabels[0],
          selectedEmailLabels[1],
          "selectedEmailLabels"
        );
      } else {
        setFieldValue(
          "to_mail",
          `${selectedEmailLabels.length} Mails selected`
        );
      }
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("handle_compose", body);
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
      // alert("values submitted");
      toast.success("Mail sent Successfully");
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
  console.log(filteredOptions, "filteredOptions");

  console.log(optionEmail, "option_Email");

  const handleCancel = (setFieldValue) => {
    setFieldValue("to_mail", "");
    setSelectAll(false);
    setIsModalOpen(false);
    setOperatorChecked({});
  };
  const words = [
    "apple",
    "banana",
    "cherry",
    "avocado",
    "blueberry",
    "chernoby;",
  ];

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const groupedOptions = filteredOptions.reduce((acc, val) => {
    const firstLetter = val.emailid.charAt(0).toUpperCase(); // Get the first letter of the email
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(val); // Add the email to the corresponding group
    return acc;
  }, {});
  console.log(groupedOptions, "groupedOptions")

  return (
    <div className="max-h-[29vw] overflow-auto">
      <div className="flex mx-[1.5vw] mt-[1vw]">
        <div className="w-full">
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
                <div className="w-full flex">
                  <div className="flex flex-col px-[3vw] gap-[0.5vw] w-full">
                    <div className="flex gap-[2vw]">
                      <div className="flex relative w-full items-center gap-[1.1vw]">
                        <label className="text-[#1F4B7F] text-[1.1vw] font-bold mr-2">
                          From:
                        </label>
                        <Field
                          type="text"
                          name="from_mail"
                          value={fromMail}
                          className="border-b-[0.1vw] w-full border-[#1F487C] placeholder-transparent text-[#1F487C] text-[1vw]  rounded-none outline-none"
                          readOnly
                        />
                        <ErrorMessage
                          name="from_mail"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[1.8vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="flex relative w-full items-center">
                        <label className="text-[#1F4B7F] text-[1.1vw] font-bold mr-2">
                          To:
                        </label>
                        <Field
                          type="text"
                          name="to_mail"
                          onClick={() => setIsModalOpen(true)}
                          className={`border-b-[0.1vw] w-full border-[#1F487C] placeholder-transparent text-[#1F487C] text-[1vw]  rounded-none outline-none ${
                            toMail ? "cursor-pointer" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="to_mail"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[1.8vw] bottom-[-1.2vw]"
                        />
                      </div>
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
                            width: "30vw",
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
                          <div className="relative">
                            <input
                              // prefix={<CiSearch size={"1vw"} />}
                              placeholder="Search"
                              className="mb-[0.6vw] text-[1vw] h-[2.25vw] w-3/4 border-b-[0.2vw] border-r-[0.2vw] border-[#1F487C] border-[0.1vw] rounded-[0.5vw] px-[2vw] outline-none"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <CiSearch
                              className="absolute left-[0.5vw] top-[0.6vw] "
                              size={"1vw"}
                            />
                          </div>
                          <div>
                            <div className="flex items-center mb-[1vw]">
                              <input
                                type="checkbox"
                                className="w-[1vw] h-[1vw] mr-[0.5vw]"
                                onChange={handleSelectAll}
                                checked={selectAll}
                              />
                              <span className="text-[1vw] text-[#1F487C]">
                                Select All
                              </span>
                            </div>
                            <div className="flex flex-wrap">
                              <div className="grid grid-rows-10 h-[20vw] w-full grid-flow-col pb-[1vw] overflow-y-scroll">
                                <div className="">
                                  {Object.keys(groupedOptions)
                                    .sort()
                                    .map((letter) => (
                                      <div key={letter}>
                                        <span className="text-[1.1vw] text-[#1F487C] font-bold">
                                          {letter}
                                        </span>
                                        {groupedOptions[letter]
                                          .sort((a, b) =>
                                            a.emailid.localeCompare(b.emailid)
                                          )
                                          .map((val) => (
                                            <div
                                              className="flex items-center my-[0.5vw]"
                                              key={val.tbs_operator_id}
                                            >
                                              <input
                                                type="checkbox"
                                                className="w-[0.9vw] h-[0.9vw] mr-[0.5vw] cursor-pointer"
                                                onChange={(e) =>
                                                  handleMailCheckbox(
                                                    e,
                                                    val.emailid
                                                  )
                                                }
                                                checked={
                                                  operatorChecked[
                                                    val.emailid
                                                  ] || false
                                                }
                                              />
                                              <span className="pt-[0.2vw] text-[.9vw] text-[#1F487C]">
                                                {val.emailid}
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-[1.5vw] text-right">
                          <button
                            onClick={() => {
                              handleCancel(setFieldValue);
                              setToMail("");
                            }}
                            className="bg-[#1F4B7F] px-[1vw] py-[.5vw] rounded-md text-white mr-[2vw] text-[1vw]"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => printSelectedValues(setFieldValue)}
                            className="bg-[#1F4B7F] px-[1vw] py-[.5vw] rounded-md text-white text-[1vw]"
                          >
                            Confirm
                          </button>
                        </div>
                      </Modal>
                    </div>
                    <div className="relative">
                      <div className="flex relative w-full items-center">
                        <label className="text-[#1F4B7F] text-[1.1vw] font-bold mr-2">
                          Subject:
                        </label>
                        <Field
                          type="text"
                          name="subject"
                          className="border-b-[0.1vw] w-full border-[#1F487C] placeholder-transparent text-[#1F487C] text-[1vw]  rounded-none outline-none"
                        />
                      </div>
                      <ErrorMessage
                        name="subject"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute left-[4.5vw] bottom-[-1.2vw]"
                      />
                    </div>
                    <div className="py-[1.5vw] ">
                      {/* <label
                    htmlFor="Compose Mail"
                    className="text-[#1F4B7F] font-medium text-[1.4vw]"
                  >
                    Compose Mail
                  </label> */}
                      <div className="relative ">
                        <CustomEditor
                          name="subject"
                          body={body}
                          setBody={setBody}
                        />
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
                        <p className="text-red-500 text-sm">
                          ComposeMail is required
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw] ">
                    <div
                      className={`${
                        view === "operator" ? "bg-[#1F4B7F]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw] rounded-bl-[0.3vw] cursor-pointer`}
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
                    </div>
                    <div
                      className={`${
                        view === "passenger" ? "bg-[#1F4B7F]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw] cursor-pointer`}
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
                          color={`${
                            view === "passenger" ? "white" : "#1F4B7F"
                          }`}
                        />
                      </span>
                      <span
                        className={`${
                          view === "passenger" ? "text-white" : "text-[#1F4B7F]"
                        } text-[1.1vw]`}
                      >
                        passenger
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BulkMail;
