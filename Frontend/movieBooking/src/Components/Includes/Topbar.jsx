import {
    Box,
    IconButton,
    useTheme,
    InputBase,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { colorModeContext, tokens } from "../../Theme";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminActions, userActions } from "../../store/index.jsx";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(colorModeContext);
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    }
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SearchBar */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }} ><SearchIcon /></IconButton>
            </Box>
            {/* Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                {
                    !isAdminLoggedIn && !isUserLoggedIn && (
                        <>
                            <IconButton LinkComponent={Link} to="/admin">
                                <AdminPanelSettingsOutlinedIcon />
                            </IconButton>
                            <IconButton LinkComponent={Link} to="/auth">
                                <SecurityOutlinedIcon />
                            </IconButton>
                        </>
                    )
                }

                {
                    isUserLoggedIn && (
                        <>
                            <IconButton LinkComponent={Link} to="/movie">
                                <BookOnlineOutlinedIcon />
                            </IconButton>
                            <IconButton LinkComponent={Link} to="/user">
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => logout(false)} LinkComponent={Link} to="/">
                                <LogoutOutlinedIcon />
                            </IconButton>
                        </>
                    )
                }
                {
                    isAdminLoggedIn && (
                        <>
                            <IconButton LinkComponent={Link} to="/add">
                                <AddCircleOutlinedIcon />
                            </IconButton>
                            <IconButton LinkComponent={Link} to="/admin">
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => logout(false)} LinkComponent={Link} to="/">
                                <LogoutOutlinedIcon />
                            </IconButton>
                        </>
                    )
                }
            </Box>
        </Box>
    )
}
export default Topbar;