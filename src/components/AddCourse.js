import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import Api from "../Api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddCourseForm = () => {
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        if (courseName === "" || courseCode === "" || courseDescription === "") {
            toast.warn("Please Provide all fields!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                limit: 1,
            });
        } else {
            console.log({ courseName, courseCode, courseDescription });
            const response = await Api.post("/api/courses", {
                courseCode,
                courseName,
                courseDescription,
            });
            if (response.status === 200) {
                toast("Successful!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    limit: 1
                });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                toast.error("Error in creation\nPlease retry after sometime", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    limit: 1,
                });
            }
        }
    };

    return ( <
        >
        <
        ToastContainer position = "top-right"
        autoClose = { 2000 }
        hideProgressBar = { false }
        newestOnTop = { false }
        closeOnClick rtl = { false }
        pauseOnFocusLoss draggable pauseOnHover theme = "light"
        transition = { Bounce }
        limit = { 1 }
        />{" "} <
        ToastContainer / >

        <
        Container maxWidth = "sm" >

        <
        Box sx = {
            { textAlign: "center", margin: "20px 0px 0px" } } >
        <
        Typography variant = "h6" > Add Course < /Typography> <
        /Box> <
        Box component = "form"
        onSubmit = { handleSubmit }
        sx = {
            {
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 4,
            }
        } >

        <
        TextField label = "Course title"
        variant = "outlined"
        value = { courseName }
        onChange = {
            (e) => setCourseName(e.target.value) }

        /> <
        TextField label = "Course code"
        variant = "outlined"
        value = { courseCode }
        onChange = {
            (e) => setCourseCode(e.target.value) }

        /> <
        TextField label = "Course description"
        variant = "outlined"
        value = { courseDescription }
        onChange = {
            (e) => setCourseDescription(e.target.value) }
        multiline rows = { 4 }

        /> <
        Button type = "submit"
        variant = "contained"
        color = "primary" >
        Add course { " " } <
        /Button>{" "} <
        /Box>{" "} <
        /Container> <
        />
    );
};

export default AddCourseForm;