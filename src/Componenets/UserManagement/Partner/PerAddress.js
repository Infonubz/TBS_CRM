import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { submitPartnerAddressData } from "../../../Api/UserManagement/Partner";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  per_address: Yup.string().required("Address is required"),

  per_state: Yup.string().required("State is required"),

  per_region: Yup.string().required("Region is required"),

  per_city: Yup.string().required("City is required"),

  per_country: Yup.string().required("Country is required"),

  per_postal: Yup.string()
    .matches(/^[0-9]{6}$/, "Postal Code must be a 6-digit number")
    .required("Postal Code is required"),
});
const PerAddress = ({
  enable,
  perAddress,
  setAddressBack,
  setCurrentpage,
  addressback,
  currentValues,
  proffesionaback,
  PartnerID,
}) => {
  console.log(enable, "addresssssssss");

  const handleSubmit = async (values) => {

    console.log(values, currentValues, "vjvjvjfhsdjfddjhfdjhfsd");

    if (PartnerID && enable == false) {
        setCurrentpage(3);
      }else {
    const response = await submitPartnerAddressData(
      PartnerID,
      values,
      currentValues
    );
    toast.success(response.message);
    setCurrentpage(3)
}
  };
  return (
    <div>
      <Formik
        initialValues={{
          per_address: perAddress.address || "",
          per_state: perAddress.state || "",
          per_region: perAddress.region || "",
          per_city: perAddress.city || "",
          per_country: perAddress.country || "",
          per_postal: perAddress.postalcode || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  Address
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  type="text"
                  name="per_address"
                  placeholder="Enter Temperory Address"
                  value={values.per_address}
                  disabled={
                    PartnerID || proffesionaback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    PartnerID || proffesionaback
                      ? enable == false
                        ? "cursor-not-allowed"
                        : ""
                      : ""
                  } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                />
                <ErrorMessage
                  name="per_address"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  State
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  as="select"
                  name="per_state"
                  value={values.per_state}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    PartnerID || proffesionaback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    PartnerID || proffesionaback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                  } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                >
                  <option label="Select State" value="" className="" />
                  <option label="Tamilnadu" value="Tamilnadu" className="" />
                  <option label="Kerala" value="Kerala" className="" />
                  <option label="Andhra" value="Andhra" className="" />
                </Field>
                <ErrorMessage
                  name="per_state"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  Region
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  as="select"
                  name="per_region"
                  value={values.per_region}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    PartnerID || proffesionaback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    PartnerID || proffesionaback
                      ? enable == false
                        ? "cursor-not-allowed"
                        : ""
                      : ""
                  } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                >
                  <option label="Select Region" value="" className="" />
                  <option
                    label="Southern Region"
                    value="southerregion"
                    className=""
                  />
                  <option
                    label="Northern Region"
                    value="northernregion"
                    className=""
                  />
                  <option
                    label="Western Region"
                    value="westernregion"
                    className=""
                  />
                  <option
                    label="Eastern Region"
                    value="easternregion"
                    className=""
                  />
                  <option
                    label="North Eastern Region"
                    value="northeasternregion"
                    className=""
                  />
                </Field>
                <ErrorMessage
                  name="per_region"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  City
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  as="select"
                  name="per_city"
                  value={values.per_city}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    PartnerID || proffesionaback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    PartnerID || proffesionaback
                      ? enable == false
                        ? "cursor-not-allowed"
                        : ""
                      : ""
                  } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                >
                  <option label="Select City" value="" className="" />
                  <option label="Tiruppur" value="Tiruppur" className="" />
                  <option label="Coimbatore" value="Coimbatore" className="" />
                  <option label="Chennai" value="Chennai" className="" />
                </Field>
                <ErrorMessage
                  name="per_city"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  Country
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  as="select"
                  name="per_country"
                  value={values.per_country}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    PartnerID || proffesionaback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    PartnerID || proffesionaback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                  } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                >
                  <option label="Select Country" value="" className="" />
                  <option label="India" value="India" className="" />
                  <option label="America" value="America" className="" />
                  <option label="Australia" value="Australia" className="" />
                </Field>
                <ErrorMessage
                  name="per_country"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  Postal Code
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  type="text"
                  name="per_postal"
                  placeholder="Enter Postal Code"
                  value={values.per_postal}
                  disabled={
                    PartnerID || proffesionaback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    PartnerID || proffesionaback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                  } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                />
                <ErrorMessage
                  name="per_postal"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between  pb-[.5vw] pt-[1.5vw]">
              <div>
                <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                  *You must fill in all fields to be able to continue
                </h1>
              </div>
              <div className="flex items-center gap-x-[0.7vw]">
                <button
                  className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                  onClick={() => {
                    setCurrentpage(1);
                    setAddressBack(true);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                  type="submit"
                  // onClick={() => setCurrentpage(3)}
                >
                  {PartnerID || proffesionaback
                    ? enable
                      ? "Update & Continue"
                      : "Continue"
                    : "Continue"}{" "}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default PerAddress;
