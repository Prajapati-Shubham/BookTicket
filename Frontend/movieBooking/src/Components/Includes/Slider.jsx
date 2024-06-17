import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../Theme.js";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};


const Slider = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box sx={{
            display: 'flex', height: '100%', minHeight: '400px',
            " & .ps-sidebar-container": {
                background: `${colors.primary[400]} !important`
            },
            "& .ps-menu-icon": {
                backgroundColor: "transparent !important",
            },
            "& .ps-menu-button": {
                padding: "5px 15px 5px 20px !important",
            },
            "& .ps-menu-button:hover": {
                backgroundColor: "inherit !important",
            },
            "& .ps-menuitem-root.active": {
                color: "#6870fa !important",
            }
        }}>
            <Sidebar collapsed={isCollapsed} >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    < MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    CineWorld
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>

                        )}
                    </MenuItem>
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Book Ticket"
                            to="/movie"
                            icon={<BookOnlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* <Item
                            title="Order Food"
                            to="/station"
                            icon={<FastfoodOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
                        <Item
                            title="Admin"
                            to="/admin"
                            icon={<AdminPanelSettingsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Authentication"
                            to="/auth"
                            icon={<SecurityOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box >
    );
};

export default Slider;