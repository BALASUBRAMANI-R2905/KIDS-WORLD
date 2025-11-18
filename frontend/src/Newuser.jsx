import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Newuser = () => {
    const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("error"); // 'error' or 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    // Reset alert
    setShowAlert(false);

    // Email or Mobile validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;
    if (!emailPattern.test(emailOrMobile) && !mobilePattern.test(emailOrMobile)) {
      newErrors.emailOrMobile = "Enter a valid email or 10-digit mobile number.";
      valid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[!@#?]).{10,100}$/;
    if (!passwordPattern.test(password)) {
      newErrors.password = "Password does not meet the requirements.";
      valid = false;
    }

    // Confirm Password check
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    // Success
    console.log({ emailOrMobile, password });
    setAlertType("success");
    setShowAlert(true);

    // Reset inputs
    setEmailOrMobile("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
    
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center px-6 py-8 w-full max-w-md">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                src="https://t4.ftcdn.net/jpg/01/34/68/65/360_F_134686594_s4TLh4Vh6QplrTQnrHANQ7EJhCheaAtJ.jpg"
                className="h-8 mr-2"
                alt="KIDS WORLD"
              />
              KIDS WORLD
            </a>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Create New Account
              </h1>

              {/* Alert Box (same style as Login) */}
              {showAlert && (
                <div
                  className={`flex p-4 mb-4 text-sm rounded-lg ${
                    alertType === "error"
                      ? "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      : "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  }`}
                  role="alert"
                >
                  <div>
                    {alertType === "error" ? (
                      <>
                        <span className="font-medium">Please fix the following errors:</span>
                        <ul className="mt-1.5 list-disc list-inside">
                          {errors.emailOrMobile && <li>{errors.emailOrMobile}</li>}
                          {errors.password && <li>{errors.password}</li>}
                          {errors.confirmPassword && <li>{errors.confirmPassword}</li>}
                        </ul>
                      </>
                    ) : (
                      <span className="font-medium">✅ Account created successfully!</span>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                {/* Email or Mobile */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="emailOrMobile"
                    value={emailOrMobile}
                    onChange={(e) => setEmailOrMobile(e.target.value)}
                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                      errors.emailOrMobile
                        ? "border-red-500 focus:border-red-500 text-red-600"
                        : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-yellow-400 dark:focus:border-yellow-400"
                    }`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="emailOrMobile"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email or Mobile
                  </label>
                </div>

                {/* Password */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 text-red-600"
                        : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-yellow-400 dark:focus:border-yellow-400"
                    }`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500 text-red-600"
                        : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-yellow-400 dark:focus:border-yellow-400"
                    }`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm Password
                  </label>
                </div>

                <button
                  type="submit"
                  className="text-black bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:focus:ring-yellow-600"
                >
                  Create Account
                </button>
              </form>


           <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
          >
            Sign in
          </button>
        </p>

              
            </div>
          </div>
        </section>
   
    </div>
  );
};

export default Newuser;
