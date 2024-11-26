import React, { useState } from "react";
import operator from "../../asserts/Operator.png";
import Operator_bg from "../../asserts/Operator-bg.png";
import logo from "../../asserts/crmlogo.png";
import OperatorForgotPassword from "../ForgotPassword/Operator";
import Operator from "../Login/Operator";

export default function OperatorLoginPage({ setAuthtoken }) {

  const [forgotpassword, setForgotPassword] = useState(false);

  return (
    <div>
      <div
        className="h-screen w-screen relative bg-[#E5FFF1] flex justify-center"
        style={{
          backgroundImage: `url(${Operator_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="absolute right-[1.5vw] top-0">
          <img src={logo} alt="logo" className="h-[6vw] w-[13vw]" />
        </div>
        <div className="w-[90%] h-[80%] relative rounded-tr-[2vw] rounded-br-[2vw] mt-[6%]">
          <div
            className="h-full w-full border-[0.1vw] border-[#1F487C] rounded-tr-[2vw] rounded-br-[2vw]"
            style={{
              backgroundImage: `url(${operator})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow:
                "0 -10px 6px rgba(0, 0, 0, 0.1), 0 10px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {forgotpassword === false ? (
              <Operator
                setAuthtoken={setAuthtoken}
                setForgotPassword={setForgotPassword}
              />
            ) : (
              <OperatorForgotPassword
                setForgotPassword={setForgotPassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
