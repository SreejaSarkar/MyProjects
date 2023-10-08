import { useRef, useState, useEffect } from "react";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import "../Plant-style.css";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { useAlert } from '../../context/AlertContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { alert, showAlert } = useAlert();
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      };

      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues,
        validationSchema: RegisterSchema,
        onSubmit: (values, action) => {
          handleRegister(values);
          action.resetForm();
        },
      });

    const handleRegister = async (values) => {
        console.log("Values are: ", values);
        try{
            await axios.post(`${baseURL}/register`, values ).then((res) => {
                if(res.data.error){
                    showAlert("Sorry!! Your registration was not successfull", "danger");
                }
                else{
                showAlert("You got registered successfully!!", "success");
                navigate("/login")}
            })
            }
            catch(e){
                showAlert("Sorry!! Your registration was not successfull", "danger");
            }
    }

    return (
        <>
            {/* {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : ( */}
                <div className="mt-5 d-flex justify-content-center align-items-center vh-100">
                    <div className="form_container p-4 rounded">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Register</h3>
                        <div className="row mb-2">
                        <div className="col">
                        <label htmlFor="username" >
                            UserName:
                        </label>
                        </div>
                        <div className="col">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="off"
                            // className="ms-5"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        </div>
                        {errors.username && touched.username ? (
                      <p className="form-error">{errors.username}</p>
                    ) : null}
                        </div>
                    
                        <div className="row mb-2">
                        <div className="col">
                    <label htmlFor="email">
                            Email
                        </label>
                        </div>
                        <div className="col">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        </div>
                        {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                        <label htmlFor="password">
                            Password
                        </label>
                        </div>
                        <div className="col">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                        />
                        </div>
                        {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                        <label htmlFor="confirm_password">
                            Confirm Password
                        </label>
                        </div>
                        <div className="col">
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                        />
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="form-error">{errors.confirmPassword}</p>
                    ) : null}
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-success mt-2" type="submit">Register</button>
                    </div>
                    </form>
                    <p className="text-end mt-2">
                        Already registered?<br />
                        <span className="line">
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
                </div>
        </>
    )
}

export default Register