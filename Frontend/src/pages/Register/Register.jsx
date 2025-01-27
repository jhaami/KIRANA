// import React, { useState } from "react";
// import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import "../../styles/Register.css";
// import { toast } from "react-toastify";
// import { registerUserApi } from "../../api/Api";

// import registerImg from "../../assets/images/register_cover.jpg";
// import userIcon from "../../assets/images/user.png";

// const Register = () => {
//   //make a usestate for 5 fields
//   const [fullname, setFullname] = useState("");
//   const [phone, setPhone] = useState("");
//   const [username, setUsername] = useState("");
//   const [usertype, setUserType] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmPassword] = useState("");

//   //use state for error message
//   const [fullnameError, setFullnameError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [userTypeError, setUserTypeError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmpasswordError, setConfirmPasswordError] = useState("");

//   // make a each function for changing the value
//   const handleFullname = (e) => {
//     setFullname(e.target.value);
//     setFullnameError("");
//   };
//   const handlePhone = (e) => {
//     setPhone(e.target.value);
//     setPhoneError("");
//   };
//   const handleUserType = (e) => {
//     setUserType(e.target.value);
//     setUserTypeError("");
//   };
//   const handleUsername = (e) => {
//     setUsername(e.target.value);
//     setUsernameError("");
//   };
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setPasswordError("");
//   };
//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//     setConfirmPasswordError("");
//   };

//   //validation
//   var validate = () => {
//     var isValid = true;
//     if (fullname.trim() === "") {
//       setFullnameError("Full Name is required");
//       isValid = false;
//     }
//     if (phone.trim() === "") {
//       setPhoneError("Phone is required");
//       isValid = false;
//     }
//     if (username.trim() === "") {
//       setUsernameError("Username is required");
//       isValid = false;
//     }
//     if (usertype.trim() === "") {
//       setUserTypeError("User Type is required");
//       isValid = false;
//     }
//     if (password.trim() === "") {
//       setPasswordError("Password is required");
//       isValid = false;
//     }

//     if(password.length < 6){
//       setPasswordError("Password must be atleast 6 characters");
//       isValid = false;
//     }

//     if(phone.length < 10){
//       setPhoneError("Invalid Phone Number");
//       isValid = false;
//     }
//     if (password !== confirmpassword) {
//       setConfirmPasswordError("Password does not match");
//       isValid = false;
//     }
//     if (confirmpassword.trim() === "") {
//       setConfirmPasswordError("Confirm Password is required");
//       isValid = false;
//     }
//     return isValid;
//   };
//   //submit button function
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //validate
//     var isValidated = validate();
//     if (!isValidated) {
//       return;
//     }
//     // Sending request to the api

//     // Making JSON object
//     const data = {
//       fullname: fullname,
//       phone: phone,
//       usertype: usertype,
//       username: username,
//       password: password,
//     };

//     registerUserApi(data).then((res) => {
//       // Received data : sucess mesaage
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         window.location = "/login";
//       }
//     });
//   };

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="8" className="m-auto">
//             <div className="register__container d-flex justify-content-between">
//               <div className="register__img">
//                 <img src={registerImg} alt="" />
//               </div>

//               <div className="register__form">
//                 <div className="user">
//                   <img src={userIcon} alt="" />
//                 </div>
//                 <h2>register</h2>

//                 <Form>
//                   <FormGroup>
//                     <input
//                       onChange={handleFullname}
//                       type="text"
//                       className="form-control"
//                       placeholder="Full Name"
//                     />
//                     {fullnameError && (
//                       <p className="text__danger">{fullnameError}</p>
//                     )}
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       onChange={handlePhone}
//                       type="text"
//                       className="form-control"
//                       placeholder="Phone"
//                     />
//                     {phoneError && <p className="text__danger">{phoneError}</p>}
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       onChange={handleUsername}
//                       type="text"
//                       className="form-control"
//                       placeholder="Username"
//                     />
//                     {usernameError && (
//                       <p className="text__danger">{usernameError}</p>
//                     )}
//                   </FormGroup>
//                   <FormGroup>
//                     <select onChange={handleUserType} className="form-control">
//                       <option value="">Select Option</option>
//                       <option value="Buyer">Buyer</option>
//                       <option value="Seller">Seller</option>
//                     </select>
//                     {userTypeError && (
//                       <p className="text__danger">{userTypeError}</p>
//                     )}
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       onChange={handlePassword}
//                       type="password"
//                       className="form-control"
//                       placeholder="Password"
//                     />
//                     {passwordError && (
//                       <p className="text__danger">{passwordError}</p>
//                     )}
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       onChange={handleConfirmPassword}
//                       type="password"
//                       className="form-control"
//                       placeholder="Confirm Password"
//                     />
//                     {confirmpasswordError && (
//                       <p className="text__danger">{confirmpasswordError}</p>
//                     )}
//                   </FormGroup>

//                   <Button
//                     className="btn secondary__btn auth__btn "
//                     type="submit"
//                     onClick={handleSubmit}
//                   >
//                     Register
//                   </Button>
//                 </Form>

//                 <p>
//                   Already have an account? <Link to="/login">Login</Link>
//                 </p>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/Register.css";
import { toast } from "react-toastify";
import { registerUserApi } from "../../api/Api";

import registerImg from "../../assets/images/register_cover.jpg";
import userIcon from "../../assets/images/user.png";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [usertype, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [fullnameError, setFullnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");

  const validate = () => {
    let isValid = true;

    if (fullname.trim() === "") {
      setFullnameError("Full Name is required");
      isValid = false;
    }

    if (phone.trim() === "") {
      setPhoneError("Phone is required");
      isValid = false;
    } else if (phone.length !== 10 || isNaN(phone)) {
      setPhoneError("Invalid Phone Number");
      isValid = false;
    }

    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (usertype.trim() === "") {
      setUserTypeError("User Type is required");
      isValid = false;
    }

    // Password validation with unmet requirement highlighting
    let passwordErrors = [];
    if (password.trim().length < 6) {
      passwordErrors.push("Password must be 6+ characters.");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Include 1 uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push("Include 1 lowercase letter.");
    }
    if (!/\d/.test(password)) {
      passwordErrors.push("Include 1 number.");
    }
    if (!/[@$!%*?&]/.test(password)) {
      passwordErrors.push("Include 1 special character.");
    }

    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join("<br />")); // Join errors with line breaks
      isValid = false;
    }

    if (password !== confirmpassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (confirmpassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }

    return isValid;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const isValidated = validate();
  //   if (!isValidated) {
  //     return;
  //   }

  //   const data = {
  //     fullname,
  //     phone,
  //     usertype,
  //     username,
  //     password,
  //   };

  //   registerUserApi(data).then((res) => {
  //     if (res.data.success === false) {
  //       toast.error(res.data.message);
  //     } else {
  //       toast.success(res.data.message);
  //       window.location = "/login";
  //     }
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validate();
    if (!isValidated) {
      return;
    }
  
    const data = {
      fullname,
      phone,
      usertype,
      username,
      password,
    };
  
    try {
      const res = await registerUserApi(data);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        window.location = "/login";
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form>
                  <FormGroup>
                    <input
                      onChange={(e) => {
                        setFullname(e.target.value);
                        setFullnameError("");
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                    />
                    {fullnameError && (
                      <p className="text__danger">{fullnameError}</p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setPhoneError("");
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                    />
                    {phoneError && <p className="text__danger">{phoneError}</p>}
                  </FormGroup>
                  <FormGroup>
                    <input
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError("");
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Username"
                    />
                    {usernameError && (
                      <p className="text__danger">{usernameError}</p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <select
                      onChange={(e) => {
                        setUserType(e.target.value);
                        setUserTypeError("");
                      }}
                      className="form-control"
                    >
                      <option value="">Select Option</option>
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                    </select>
                    {userTypeError && (
                      <p className="text__danger">{userTypeError}</p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    {passwordError && (
                      <p
                        className="text__danger"
                        dangerouslySetInnerHTML={{ __html: passwordError }}
                      ></p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPasswordError("");
                      }}
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    {confirmpasswordError && (
                      <p className="text__danger">{confirmpasswordError}</p>
                    )}
                  </FormGroup>

                  <Button
                    className="btn secondary__btn auth__btn "
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>

                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;


