import React, { useState } from "react";
import logo from "../../asserts/crmlogo.png";
import ProductOwnerForgotPassword from "../ForgotPassword/ProductOwner";
import OwnerEmployee from "../Login/OwnerEmployee";
import employee from "../../asserts/employee.png";
import employee_bg from "../../asserts/employee_bg.png";

export default function OwnerEmployeeLoginPage({ setAuthtoken }) {

  const [forgotpassword, setForgotPassword] = useState(false);

  return (
    <div>
      <div
        className="h-screen w-screen relative bg-[#E5FFF1] flex justify-center"
        style={{
          backgroundImage: `url(${employee_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="absolute right-[1.5vw] top-0">
          <img src={logo} alt="logo" className="h-[6vw] w-[13vw]" />
        </div>
        <div className="w-[90%] h-[80%] relative rounded-tl-[2vw] rounded-bl-[2vw] mt-[6%]">
          <div
            className="h-full w-full border-[0.1vw] border-[#1F487C] rounded-tl-[2vw] rounded-bl-[2vw]"
            style={{
              backgroundImage: `url(${employee})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow:
                "0 -10px 6px rgba(0, 0, 0, 0.1), 0 10px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {forgotpassword === false ? (
              <OwnerEmployee
                setAuthtoken={setAuthtoken}
                setForgotPassword={setForgotPassword}
              />
            ) : (
              <ProductOwnerForgotPassword
                setForgotPassword={setForgotPassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
