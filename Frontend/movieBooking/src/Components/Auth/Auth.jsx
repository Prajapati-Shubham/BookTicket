import React from "react";
import Header from "../Includes/Header.jsx";
import AuthForm from "./AuthForm.jsx";
import {
    Box
} from "@mui/material";
import { sendUserAuthRequest } from "../../Api/ApiHelper.jsx";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/index.jsx";

const Auth = () => {
    const dispatch = useDispatch();
    const onResponseReceived = (data) => {
        console.log(data);
        dispatch(userActions.login());
        localStorage.setItem("userId", data.data._id);
        // console.log(data.data._id);
    }
    const getData = (data) => {
        // console.log("FROM AUTH", data);
        sendUserAuthRequest(data.inputs, data.signup)
            .then(onResponseReceived)
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <Box sx={{ ml: "10px" }}>
            <Header title="AUTHENTICATION" subtitle="All Auth Process" />
            {/* <AuthForm /> */}
            <Box>
                <AuthForm onSubmit={getData} isAdmin={false} />
            </Box>
        </Box>
    )
}

export default Auth;