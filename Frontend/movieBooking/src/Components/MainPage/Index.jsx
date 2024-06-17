import React from "react";
import Header from "../Includes/Header.jsx";
import GetMovies from "../Movies/GetMovies.jsx";
import {
    Box
} from "@mui/material";

function Index() {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" >
                <Header title="DASHBOARD" subtitle="Welcone to your dashboard" />
            </Box>
            <GetMovies/>
        </Box>

    )
}

export default Index;