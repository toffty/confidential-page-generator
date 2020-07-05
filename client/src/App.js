import React, {useState} from 'react';
import {BrowserRouter, Redirect, Route, Router, Switch} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import GeneratePage from "./components/GeneratePage";
import history from "./containers/customHistory";
import RegistrationForm from "./components/RegistrationForm";
import axios from "axios";
import {useFormik} from "formik";

const App = () => {

    const [userData, setUserData] = useState({
        token: "",
        user: undefined,
        isSignUp: false
    })


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',

        },
        onSubmit: (values) => {
            return axios.post("/user/login", values,).then(({data}) => {
                console.log(data);
                setUserData({
                    user: data.user,
                    token: data.token,
                    isSignUp: true
                })

            }).then(() => {
            }).catch(err => {
                if (err.response.status === 404) {
                    console.log('User not Found')

                }
            })
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">UserName</label>
                <input
                    id="username"
                    name="username"
                    type="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <label htmlFor="username">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}

                />

                <button type="submit">Submit</button>
            </form>

            <div>
                {userData.isSignUp &&
                <div>
                    <GeneratePage token={userData.token}/>
                </div>
                }
                {!userData.isSignUp &&
                <div>
                    User not Found
                </div>
                }
            </div>
        </div>


    );
};

export default App;
