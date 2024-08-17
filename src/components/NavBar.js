import React from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const currentTab = location.pathname;
    console.log(currentTab);
    return ( <
        AppBar position = "static" >
        <
        Toolbar >
        <
        Typography variant = "h6"
        sx = {
            { flexGrow: 1 } } >
        Course Manager Web App <
        /Typography> <
        Tabs value = { currentTab }
        textColor = "inherit"
        indicatorColor = "secondary" >
        <
        Tab label = "Courses"
        value = "/"
        component = { Link }
        to = "/" / >
        <
        Tab label = "Add Course or Instance"
        value = "/add-course"
        component = { Link }
        to = "/add" / >
        <
        Tab label = "View Courses Instances"
        value = "/view-instance"
        component = { Link }
        to = "/view-instance" / >
        <
        /Tabs> <
        /Toolbar> <
        /AppBar>
    );
};

export default Navbar;