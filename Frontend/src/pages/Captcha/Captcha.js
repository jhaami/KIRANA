import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../../styles/Captcha.css";


const Captcha = ({ onCaptchaChange }) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
      onCaptchaChange(value); // Pass the captcha token to the parent component
    } else {
      setCaptchaVerified(false);
    }
  };

  return (
    <div>
      <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} // Replace with your actual Site Key
        onChange={handleCaptchaChange}
      />
      {!captchaVerified && (
        <p style={{ color: "white" }}>Please verify that you are not a robot.</p>
      )}
    </div>
  );
};

export default Captcha;
