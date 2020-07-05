import React, {useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios'
import history from "../containers/customHistory";

import {withRouter} from 'react-router-dom'
import {Redirect} from "react-router-dom";


const GeneratePage = (props) => {

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const [isSignedUp, setisSignedUp] = useState(false)


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            text: '',
            openings: 0

        },
        onSubmit: (values) => {
            return axios.post("/page/create", values, {headers: {"token": props.token}}).then(({data}) => {
                console.log(data);

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
                <input
                    id="text"
                    name="text"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.text}

                />
                <label>Openings</label>
                <input
                    id="openings"
                    name="openings"
                    type="openings"
                    onChange={formik.handleChange}
                    value={formik.values.openings}

                />

                <button type="submit">Submit</button>
            </form>


        </div>


    );
};

export default (GeneratePage);