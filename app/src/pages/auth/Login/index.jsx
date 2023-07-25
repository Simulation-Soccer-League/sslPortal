import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'; // Example for using Yup validation library
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function LoginIndex({ setToken }) {
  // const navigate = useNavigate();
  const [error, setError] = useState(null);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    try {
      const validatedData = await validationSchema.validate(values);

      // console.log(values)

      // Send validated data to server
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log("Waiting")
      } else {
        // Handle successful login
        console.log('Success')

        const errorData = await response.json();
        // console.log(errorData);
        setToken(errorData);
      }
    } catch (error) {
      // Handle validation error
      setError(error.message);
    }
  };
  // const handleSubmit = () => {
  //   setError(false);
  //   console.log(username);
  //   console.log(password);
  //   setLoading(true);
  //   navigate("/");
  // };

  const LoginImage =
    "../FA";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-gray-800 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={`${LoginImage}.png`}
                alt="Logo Login"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Login to Your Account
                </h1>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                Welcome Back!
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    Login with your username and password
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>

              {/* Login Form */}
              <div className="md:mt-10 mt-4">

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched }) => (
                    <Form>
                      <div className="flex flex-col mb-3">
                        <div className="relative">
                          <div>
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-9 w-10 text-gray-400">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <Field
                              type="text"
                              name="username"
                              // onChange={e => setUsername(e.target.value)}
                              className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-gray-400" />
                          </div>
                          {errors.username && touched.username && (
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.username}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Password */}
                      <div className="flex flex-col mb-6">
                        <div className="relative">
                          <div>
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-9 w-10 text-gray-400">
                              <FontAwesomeIcon icon={faLock} />
                            </div>
                            <Field
                              type="password"
                              name="password"
                              // onChange={e => setPassword(e.target.value)}
                              className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-gray-400" />
                          </div>
                          {errors.password && touched.password && (
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.password}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Forgot Password Link
                      <div className="flex items-center mb-6 -mt-2 md:-mt-4">
                        <div className="flex ml-auto">
                          <Link
                            to=""
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="inline-flex font-semibold text-xs sm:text-sm text-gray-500 hover:text-gray-700"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                      </div> */}

                      {/* Button Login */}
                      {error && <div className="error">{error}</div>}
                      <div className="flex w-full">
                        <button
                          disabled={loading}
                          type="submit"
                          className="flex items-center justify-center focus:outline-none text-white text-sm bg-gray-500 hover:bg-gray-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                        >
                          <span className="mr-2 md:uppercase">
                            {loading ? "Processing...." : "Login"}
                          </span>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* Register Link */}
              <div className="flex justify-center items-center  my-6 md:mb-0">
                <Link
                  to="/auth/register"
                  className="inline-flex items-center font-bold text-gray-500 hover:text-gray-700 text-xs text-center"
                >
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  </span>
                  <span className="ml-2">Register a new user</span>
                </Link>
              </div>
              {/* End Register Link */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

LoginIndex.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginIndex;
