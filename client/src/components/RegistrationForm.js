import React, {useState} from 'react';
import { useFormik } from 'formik';
import axios from 'axios'




const RegistrationForm = (props) => {

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted




    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',

        },
        onSubmit: (values) => {
            return axios.post("/user/registration", values).then(({data}) =>{

            })
        },
    });
    return (
        <div>
            <div>Registration page</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">UserName Login</label>
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


        </div>


    );
};

export default RegistrationForm;