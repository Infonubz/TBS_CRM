import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { submitPartnerAddressData } from "../../../Api/UserManagement/Partner";
import { toast } from "react-toastify";
import { ConfigProvider, Select } from "antd";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const validationSchema = Yup.object().shape({
  per_address: Yup.string().required("Address is required").max(100, "Maximum 100 characters only"),

  per_state: Yup.string().required("State is required"),

  per_region: Yup.string().required("Region is required"),

  per_city: Yup.string().required("City is required"),

  per_country: Yup.string().required("Country is required"),

  per_postal: Yup.string()
    .matches(/^[0-9]{6}$/, "Postal code must be a 6-digit number")
    .required("Postal code is required"),
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
  updatedata,
  documentback,
  empaddressdata
}) => {
  console.log(enable, "addresssssssss");

  const handleSubmit = async (values) => {

    console.log(values, currentValues, "vjvjvjfhsdjfddjhfdjhfsd");

    // if (operatorID && enable == false && documentback == true || updatedata && enable == false)

    if (PartnerID && enable == false && documentback == true || updatedata && empaddressdata?.perm_add != null && enable == false) {
      setCurrentpage(3);
    } else {
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
    <div className="umselect">
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
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  Address
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <input
                  type="text"
                  name="per_address"
                  style={{ display: "none" }}
                />
                <Field
                  type="text"
                  name="per_address"
                  placeholder="Enter Temperory Address"
                  autoComplete="per_address-field"
                  value={values.per_address}
                  disabled={
                    updatedata && empaddressdata?.perm_add != null || documentback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${updatedata && empaddressdata?.perm_add != null || documentback
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
                  Postal Code
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <input
                  type="text"
                  name="per_postal"
                  style={{ display: "none" }}
                />
                <Field
                  type="text"
                  name="per_postal"
                  placeholder="Enter Postal Code"
                  autoComplete="per_postal-field"
                  value={values.per_postal}
                  disabled={
                    updatedata && empaddressdata?.perm_add != null || documentback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${updatedata && empaddressdata?.perm_add != null || documentback
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
            <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">

              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  City
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                {/* <Field
                  as="select"
                  name="per_city"
                  value={values.per_city}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    updatedata || documentback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    updatedata || documentback
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
                </Field> */}
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: '#aebed1',
                        optionSelectedColor: '#FFF',
                        optionSelectedBg: '#aebed1',
                        optionHeight: '2',
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    value={values.per_city}
                    placement="topRight"
                    listHeight={190}
                    onChange={(value) => {
                      handleChange({ target: { name: 'per_city', value } })
                    }}
                    disabled={
                      updatedata && empaddressdata?.perm_add != null || documentback
                        ? enable
                          ? false
                          : true
                        : false
                    }
                    name="per_city"
                    className={`${updatedata && empaddressdata?.perm_add != null || documentback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                      } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    placeholder="Select city"
                    filterOption={(input, option) =>
                      option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                    }
                    optionFilterProp="value"
                    suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                      <IoMdArrowDropup size="2vw" />
                    </span>}
                    style={{ padding: 4 }}
                    options={[
                      {
                        value: '',
                        label: (
                          <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            Select City
                          </div>
                        ),
                        disabled: true,
                      },
                      {
                        value: 'Tiruppur',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Tiruppur
                          </div>
                        ),
                      },
                      {
                        value: 'Coimbatore',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Coimbatore
                          </div>
                        ),
                      },
                      {
                        value: 'Chennai',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Chennai
                          </div>
                        ),
                      },
                    ]}
                  />
                </ConfigProvider>
                <ErrorMessage
                  name="per_city"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  State
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                {/* <Field
                  as="select"
                  name="per_state"
                  value={values.per_state}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    updatedata || documentback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    updatedata || documentback
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
                </Field> */}
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: '#aebed1',
                        optionSelectedColor: '#FFF',
                        optionSelectedBg: '#aebed1',
                        optionHeight: '2',
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    value={values.per_state}
                    placement="topRight"
                    listHeight={190}
                    onChange={(value) => {
                      handleChange({ target: { name: 'per_state', value } })
                    }}
                    disabled={
                      updatedata && empaddressdata?.perm_add != null || documentback
                        ? enable
                          ? false
                          : true
                        : false
                    }
                    name="per_state"
                    className={`${updatedata && empaddressdata?.perm_add != null || documentback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                      } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    placeholder="Select State"
                    filterOption={(input, option) =>
                      option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                    }
                    optionFilterProp="value"
                    suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                      <IoMdArrowDropup size="2vw" />
                    </span>}
                    style={{ padding: 4 }}
                    options={[
                      {
                        value: '',
                        label: (
                          <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            Select State
                          </div>
                        ),
                        disabled: true,
                      },
                      {
                        value: 'Tamilnadu',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Tamilnadu
                          </div>
                        ),
                      },
                      {
                        value: 'Kerala',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Kerala
                          </div>
                        ),
                      },
                      {
                        value: 'Andhra',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Andhra
                          </div>
                        ),
                      },
                      {
                        value: 'Telangana',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Telangana
                          </div>
                        ),
                      },
                      {
                        value: 'Karnataka',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Karnataka
                          </div>
                        ),
                      },
                    ]}
                    
                  />
                </ConfigProvider>
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
                {/* <Field
                  as="select"
                  name="per_region"
                  value={values.per_region}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    updatedata || documentback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    updatedata || documentback
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
                </Field> */}
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: '#aebed1',
                        optionSelectedColor: '#FFF',
                        optionSelectedBg: '#aebed1',
                        optionHeight: '2',
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    value={values.per_region}
                    placement="topRight"
                    listHeight={190}
                    onChange={(value) => {
                      handleChange({ target: { name: 'per_region', value } })
                    }}
                    disabled={
                      updatedata && empaddressdata?.perm_add != null || documentback
                        ? enable
                          ? false
                          : true
                        : false
                    }
                    name="per_region"
                    className={`${updatedata && empaddressdata?.perm_add != null || documentback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                      } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    placeholder="Select region"
                    filterOption={(input, option) =>
                      option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                    }
                    optionFilterProp="value"
                    suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                      <IoMdArrowDropup size="2vw" />
                    </span>}
                    style={{ padding: 4 }}
                    options={[
                      {
                        value: '',
                        label: (
                          <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            Select Region
                          </div>
                        ),
                        disabled: true,
                      },
                      {
                        value: 'southernregion',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Southern Region
                          </div>
                        ),
                      },
                      {
                        value: 'northernregion',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Northern Region
                          </div>
                        ),
                      },
                      {
                        value: 'westernregion',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Western Region
                          </div>
                        ),
                      },
                      {
                        value: 'easternregion',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Eastern Region
                          </div>
                        ),
                      },
                      {
                        value: 'northeasternregion',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            North Eastern Region
                          </div>
                        ),
                      },
                    ]}

                  />
                </ConfigProvider>
                <ErrorMessage
                  name="per_region"
                  component="div"
                  className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                />
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F] text-[1.1vw] ">
                  Country
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                {/* <Field
                  as="select"
                  name="per_country"
                  value={values.per_country}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     localStorage.setItem("status", e.target.value);
                  //   }}
                  disabled={
                    updatedata || documentback
                      ? enable
                        ? false
                        : true
                      : false
                  }
                  className={`${
                    updatedata || documentback
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
                </Field> */}
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: '#aebed1',
                        optionSelectedColor: '#FFF',
                        optionSelectedBg: '#aebed1',
                        optionHeight: '2',
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    value={values.per_country}
                    placement="topRight"
                    listHeight={190}
                    onChange={(value) => {
                      handleChange({ target: { name: 'per_country', value } })
                    }}
                    disabled={
                      updatedata && empaddressdata?.perm_add != null || documentback
                        ? enable
                          ? false
                          : true
                        : false
                    }
                    name="per_country"
                    className={`${updatedata && empaddressdata?.perm_add != null || documentback
                      ? enable == false
                        ? " cursor-not-allowed"
                        : ""
                      : ""
                      } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    placeholder="Select Country"
                    filterOption={(input, option) =>
                      option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                    }
                    optionFilterProp="value"
                    suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                      <IoMdArrowDropup size="2vw" />
                    </span>}
                    style={{ padding: 4 }}
                    options={[
                      {
                        value: '',
                        label: (
                          <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            Select Country
                          </div>
                        ),
                        disabled: true,
                      },
                      {
                        value: 'India',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            India
                          </div>
                        ),
                      },
                      {
                        value: 'America',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            America
                          </div>
                        ),
                      },
                      {
                        value: 'Australia',
                        label: (
                          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Australia
                          </div>
                        ),
                      },
                    ]}
                  />
                </ConfigProvider>
                <ErrorMessage
                  name="per_country"
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
              <div className="flex items-center pb-[.6vw] gap-x-[0.7vw]">
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
                  {updatedata || documentback
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
