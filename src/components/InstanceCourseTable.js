import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Api from '../Api';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

function InstanceCourseTable() {
    const navigate = useNavigate();

    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    const handleFilter = () => {
        if (!year && !semester) {
            setFilteredCourses(allCourses);
            return;
        }

        const filtered = allCourses.map(course => {
            const filteredInstances = course.courseInstanceList.filter(instance =>
                (!year || instance.year === year) &&
                (!semester || instance.semester === semester)
            );
            return {
                ...course,
                courseInstanceList: filteredInstances
            };
        }).filter(course => course.courseInstanceList.length > 0);

        setFilteredCourses(filtered);
    };

    const handleClick = async(action, courseCode, year = 'x', semester = 'x') => {
        if (action === "getDetails") {
            navigate(`/course/${courseCode}`);
        } else if (action === "delete") {
            const response = await Api.delete(`/api/instances/${year}/${semester}/${courseCode}`);
            if (response.status === 200) {
                toast.success("Successful!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                // Re-fetch data after deletion
                fetchCourses();
            } else {
                toast.error("Error in deletion\nPlease retry later.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    };

    const fetchCourses = async() => {
        const response = await Api.get('/api/instances');
        if (response && response.data) {
            setAllCourses(response.data);
            setFilteredCourses(response.data);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        handleFilter();
    }, [year, semester]);

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
        /> <
        Container >
        <
        form noValidate autoComplete = "off"
        style = {
            { marginBottom: '20px', margin: '20px 0px', display: 'flex', gap: '10px' } } >
        <
        TextField label = "Year"
        variant = "outlined"
        value = { year }
        onChange = {
            (e) => setYear(e.target.value) }
        size = "small" /
        >
        <
        TextField label = "Select semester"
        value = { semester }
        onChange = {
            (e) => setSemester(e.target.value) }
        variant = "outlined"
        size = "small" >
        <
        /TextField> <
        Button variant = "contained"
        color = "primary"
        onClick = { handleFilter } >
        List instances <
        /Button> <
        /form> <
        TableContainer component = { Paper } >
        <
        Table >
        <
        TableHead >
        <
        TableRow sx = {
            { backgroundColor: "#87CEFA", color: "white" } } >
        <
        TableCell sx = {
            { color: "white", fontSize: "1rem", fontWeight: "700" } }
        align = "center" >
        Course Title <
        /TableCell> <
        TableCell sx = {
            { color: "white", fontSize: "1rem", fontWeight: "700" } }
        align = "center" >
        Year - Sem <
        /TableCell> <
        TableCell sx = {
            { color: "white", fontSize: "1rem", fontWeight: "700" } }
        align = "center" >
        Code <
        /TableCell> <
        TableCell sx = {
            { color: "white", fontSize: "1rem", fontWeight: "700" } }
        align = "center" >
        Action <
        /TableCell> <
        /TableRow> <
        /TableHead> <
        TableBody > {
            filteredCourses.map((course) =>
                course.courseInstanceList.map((instance) => ( <
                    TableRow key = { `${course.id}-${instance.year}-${instance.semester}` } >
                    <
                    TableCell align = "center" > { course.courseName } < /TableCell> <
                    TableCell align = "center" > { `${instance.year}-${instance.semester}` } < /TableCell> <
                    TableCell align = "center" > { course.courseCode } < /TableCell> <
                    TableCell align = "center" >
                    <
                    Button onClick = {
                        () => handleClick("getDetails", course.courseCode) } >
                    <
                    SearchIcon color = "action" / >
                    <
                    /Button>{" "} <
                    Button onClick = {
                        () => handleClick("delete", course.courseCode, instance.year, instance.semester) } >
                    <
                    DeleteIcon color = "action" / >
                    <
                    /Button>{" "} <
                    /TableCell> <
                    /TableRow>
                ))
            )
        } <
        /TableBody> <
        /Table> <
        /TableContainer> <
        /Container> <
        ToastContainer / >
        <
        />
    );
}

export default InstanceCourseTable;