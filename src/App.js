import "./App.css";
import { Route, Routes } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import CourseTable from "./components/CoursesTable";
import Navbar from "./components/NavBar";
import InstanceCourseTable from "./components/InstanceCourseTable";
import AddForm from "./components/AddForm";

function App() {
    return ( <
        >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < CourseTable / > }
        />{" "} <
        Route path = "/view-instance"
        element = { < InstanceCourseTable / > }
        /> <
        Route path = "/course/:courseCode"
        element = { < CourseDetail / > }
        />{" "} <
        Route path = "/add"
        element = { < AddForm / > }
        />{" "} <
        /Routes>{" "} <
        />
    );
}

export default App;