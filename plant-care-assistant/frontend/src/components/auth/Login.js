import { useContext } from "react";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import "../Plant-style.css";
import { LoginSchema } from "../../schemas/LoginSchema";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { useAlert } from '../../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

const Login = () => {
    const { alert, showAlert } = useAlert();
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        email: "",
        password: ""
      };

      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values, action) => {
          handleSave(values);
          action.resetForm();
        },
      });

    axios.defaults.withCredentials = true;
    const handleSave = async (values) => {
        try{
            await axios.post(`${baseURL}/login`, values ).then((res) => {
                if(res.data.error){
                    showAlert("Sorry!! Your login was not successfull", "danger");
                }
                else{
                showAlert("You got logged in successfully!!", "success");
                navigate("/");
                setUser({ username: values.username, email: values.email });
                }
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
                        <h3 className="text-center mb-4">Login</h3>
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
                    <div className="d-grid">
                        <button className="btn btn-success mt-2" type="submit">Login</button>
                    </div>
                    </form>
                    <p className="text-end mt-2">
                        Not yet registered?<br />
                        <span className="line">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>
                </div>
                </div>
        </>
    )
}

export default Login