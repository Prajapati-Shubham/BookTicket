import React from "react";
import Header from "../Includes/Header";
import AuthForm from "../Auth/AuthForm.jsx";
import { useDispatch } from "react-redux";
import {
    Box
} from "@mui/material"
import { sendAdminLoginRequest } from "../../Api/ApiHelper.jsx";
import { adminActions } from "../../store/index.jsx";

const Admin = () => {
    const dispatch = useDispatch();
    const onResponseReceived = (data) => {
        console.log(data);
        dispatch(adminActions.login());
        localStorage.setItem("adminId", data.id);
        localStorage.setItem("token", data.token);
    }
    const getData = (data) => {
        console.log("ADMIN DATA", data);
        sendAdminLoginRequest(data.inputs)
            .then(onResponseReceived)
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <Box sx={{ ml: "10px" }}>
            <Header title="ADMIN" subtitle="Welcome Admin" />
            <Box>
                <AuthForm onSubmit={getData} isAdmin={true} />
            </Box>
        </Box>
    )
}

export default Admin;