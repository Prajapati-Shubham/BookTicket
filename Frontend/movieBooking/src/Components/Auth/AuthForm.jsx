import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    FormLabel,
    Button,
    useTheme
} from "@mui/material";
import { tokens } from "../../Theme.js";

const labelStyle = {
    mt: 1,
    mb: 1
};

const AuthForm = ({ onSubmit, isAdmin }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isSignup, setIsSignup] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: "",
    })

    const handelChange = (e) => {
        setInputs((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }))

    }
    const handelSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        onSubmit({ inputs, signup: isAdmin ? false : isSignup });
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }} bgcolor={colors.blueAccent[900]}>
            <Typography
                variant="h4" color={colors.grey[100]}> {isSignup ? "Login" : "SignUp"}

            </Typography>
            <form onSubmit={handelSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" width={300} mt={2}>

                    {!isAdmin && isSignup && <>
                        <FormLabel style={labelStyle}>Email</FormLabel>
                        <TextField
                            placeholder="Enter Name"
                            type="text"
                            name="name"
                            value={inputs.name}
                            required
                            fullWidth
                            onChange={handelChange}
                        />
                    </>}
                    <FormLabel style={labelStyle}>Email</FormLabel>
                    <TextField
                        placeholder="Enter Email"
                        type="email"
                        value={inputs.username}
                        name="username"
                        required
                        fullWidth
                        onChange={handelChange}
                    />
                    <FormLabel style={labelStyle}>Password</FormLabel>
                    <TextField
                        placeholder="Enter Password"
                        type="password"
                        value={inputs.password}
                        name="password"
                        required
                        fullWidth
                        onChange={handelChange}
                    />
                    <Button sx={{ mt: 2 }}
                        type="submit"
                        variant="contained"
                        fullwidth>
                        {isSignup ? "SignUp" : "Login"}
                    </Button>
                    {!isAdmin && <Button
                        sx={{ mt: 1 }}
                        variant="contained"
                        onClick={() => setIsSignup(!isSignup)}
                        fullwidth>
                        Switch To {isSignup ? "Login" : "SignUp"}
                    </Button>}
                </Box>
            </form>
        </Box>
    );
};

export default AuthForm;
