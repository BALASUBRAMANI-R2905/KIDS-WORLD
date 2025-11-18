import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    // ------------ FRONTEND VALIDATION --------------
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;
    if (!emailPattern.test(emailOrMobile) && !mobilePattern.test(emailOrMobile)) {
      newErrors.emailOrMobile = "Enter a valid email or 10-digit mobile number.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    // ------------ BACKEND LOGIN CALL --------------
    const res = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrMobile, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setBackendError(data.message);
      return;
    }

    // ✔ LOGIN SUCCESS
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  return (
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
            Login
          </h1>

          {/* Backend Error */}
          {backendError && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {backendError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">

            {/* Email or Mobile */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                  errors.emailOrMobile
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-900"
                }`}
                placeholder=" "
                required
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6">
                Mobile number or email
              </label>
              {errors.emailOrMobile && (
                <p className="text-red-500 text-sm mt-1">{errors.emailOrMobile}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                  errors.password
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-900"
                }`}
                placeholder=" "
                required
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="text-black bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer">
              Create a new Account
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
