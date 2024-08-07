// import { RichTextEditor } from "@syncfusion/ej2-react-richtexteditor";
import { Select } from "antd";
import { ErrorMessage, Field, Formik } from "formik";

const BulkMail = () => {
  return (
    <Formik>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="">
              <div className="grid grid-rows-2 gap-y-[3vw] px-[3vw]">
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <label
                      htmlFor="user"
                      className="text-[#1F4B7F] font-medium text-[1.4vw]"
                    >
                      User
                    </label>
                  </div>
                  <div className="bmail">
                    <Select
                      showSearch
                      placeholder="Select one"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      className=" customize-placeholder border-r-[0.25vw] border-l-[0.03vw] border-t-[0.03vw] px-[0.2vw] border-b-[0.25vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3.2vw] w-[25vw] rounded-md outline-none"
                      options={[
                        { value: 1, label: "manoj" },
                        { value: 2, label: "vikram" },
                        { value: 3, label: "Praveen" },
                      ]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <label
                      htmlFor="from_mail"
                      className="text-[#1F4B7F] font-medium text-[1.4vw]"
                    >
                      From Mail
                    </label>
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="from_mail"
                      placeholder="Enter Company Name"
                      className="customize-placeholder border-r-[0.25vw] border-l-[0.03vw] border-t-[0.03vw] px-[0.2vw] border-b-[0.25vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3.2vw] w-[25vw] rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="from_mail"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <label
                      htmlFor="user"
                      className="text-[#1F4B7F] font-medium text-[1.4vw]"
                    >
                      User
                    </label>
                  </div>
                  <div className="bmail">
                    <Select
                      showSearch
                      placeholder="Select one"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      className=" customize-placeholder border-r-[0.25vw] border-l-[0.03vw] border-t-[0.03vw] px-[0.2vw] border-b-[0.25vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3.2vw] w-[25vw] rounded-md outline-none"
                      options={[
                        { value: 1, label: "manoj" },
                        { value: 2, label: "vikram" },
                        { value: 3, label: "Praveen" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-[#1F4B7F] font-medium text-[1.4vw]"
                >
                  Subject
                </label>
                {/* <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  className="border border-[#1F487C] text-[#1F487C] text-lg h-10 w-full rounded-md outline-none px-2"
                /> */}
                {/* <RichTextEditor/> */}
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default BulkMail;
