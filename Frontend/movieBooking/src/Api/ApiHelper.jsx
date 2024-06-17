import React from "react";
import axios from "axios";

export const getAllMovies = async () => {
    const res = axios.get("movie/getMovies")
        .catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log("No Data");
    }
    const data = await res.data;
    return data;
}

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios.post(`user/${signup ? "register" : "login"}`, {
        name: signup ? data.name : "",
        username: data.username,
        password: data.password,
    }).catch((err) => console.log(err));
    console.log(res);

    if (res.status !== 200 && res.status !== 201) {
        console.error();
    }
    const resData = await res.data;
    return resData;
}

export const sendAdminLoginRequest = async (data) => {
    const res = await axios.post("/admin/login", {
        username: data.username,
        password: data.password,
    }).catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpeccted Error occurs");
    }
    const resData = await res.data;
    return resData;
}