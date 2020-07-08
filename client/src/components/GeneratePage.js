import React, {useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios'
import {useCookies} from "react-cookie";




const GeneratePage = (props) => {

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted


    const [pageData, setPageData] = useState({
        password: "",
        url: "",
        isSubmit: false,
        id: ""
    })

    const [timeCookies, setTimeCookies, removeTimeCookies] = useCookies(['opening time']);
    const [pathCookies, setPathCookie, removePathCookie] = useCookies(['path']);


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            text: '',
            openings: 0

        },
        onSubmit: (values) => {
            return axios.post("/page/create", values, {headers: {"token": props.token}}).then(({data}) => {
                setPageData({
                    url: data.content,
                    password: data.password,
                    isSubmit: true,
                    id: data._id
                })
                const date = new Date()
                setTimeCookies ('opening time',date.getHours().toString() + date.getMinutes().toString( + date.getSeconds().toString()))
                setPathCookie('path',' http://localhost:7777/page/' + pageData.id)

            })
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="text">Text</label>
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
            <div>
                {pageData.isSubmit &&
                <div>
                    <h3> Your link: </h3>
                  <span>
                      http://localhost:7777/page/{pageData.id}
                  </span>
                </div>
                }
            </div>
        </div>


    );
};

export default (GeneratePage);