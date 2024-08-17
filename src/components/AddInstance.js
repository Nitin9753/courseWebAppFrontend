import React, { useState, useEffect } from "react";
import {
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    TextField,
    Typography,
} from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../Api";
import { useNavigate } from "react-router-dom";

const AddInstanceForm = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [courseCode, setCourseCode] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");

    useEffect(() => {
        // Replace with your actual API endpoint
        const fetchCourses = async() => {
            try {
                const response = await Api.get("/api/courses");
                console.log(response.data);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseChange = (event) => {
        setCourseCode(event.target.value);
    };

    const handleAddInstance = async() => {
        // Implement the logic to handle the instance addition

        console.log(
            "the value fo all the fields are: ",
            year,
            semester,
            courseCode
        );
        // console.log("Selected Type:", selectedType);
        if (courseCode === "" || year === "" || semester === "") {
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
                limit: 1
            });
        } else {
            const response = await Api.post("/api/instances", {
                code: courseCode,
                year: year,
                semester: semester,
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
                }, 5000);
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
                    limit: 1
                });
            }
        }
    };

    return ( <
        Box display = "flex"
        flexDirection = "column"
        alignItems = "center"

        minHeight = "100vh"
        maxWidth = "300px"
        margin = "auto" >
        <
        ToastContainer position = "top-right"
        autoClose = { 2000 }
        hideProgressBar = { false }
        newestOnTop = { false }
        closeOnClick rtl = { false }
        pauseOnFocusLoss draggable pauseOnHover theme = "light"
        // transition: Bounce,
        transition = { Bounce }
        limit = { 1 }
        /> { /* Same as */ } <
        ToastContainer / >
        <
        Typography variant = "h6"
        m = "20px 0px" > Add Instance < /Typography> <
        FormControl fullWidth >
        <
        InputLabel id = "course-select-label" > Select course < /InputLabel>{" "} <
        Select labelId = "course-select-label"
        variant = "outlined"
        id = "course-select"
        value = { courseCode }
        onChange = { handleCourseChange } >
        {
            courses.map((course) => ( <
                MenuItem key = { course.id }
                value = { course.courseCode } > { " " } { course.courseCode } { " " } <
                /MenuItem>
            ))
        } { " " } <
        /Select>{" "} <
        Box sx = {
            { display: "flex", gap: "10px", margin: "10px 0px" } } >
        <
        TextField label = "Year"
        variant = "outlined"
        value = { year }
        onChange = {
            (e) => setYear(e.target.value) }
        type = "number"
        required /
        >
        <
        TextField label = "Semester"
        variant = "outlined"
        value = { semester }
        onChange = {
            (e) => setSemester(e.target.value) }
        type = "number"
        required /
        >
        <
        /Box> <
        Button variant = "contained"
        color = "primary"
        onClick = { handleAddInstance } >
        Add instance { " " } <
        /Button>{" "} <
        /FormControl> <
        /Box>
    );
};

export default AddInstanceForm;