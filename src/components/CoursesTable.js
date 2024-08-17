import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Box,
} from "@mui/material";
import Api from "../Api";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

const CourseTableImpl = ({ data}) => {
  const navigate = useNavigate();
  const handelClick = async (message, courseCode) => {
    if (message === "getDetails") navigate(`/course/${courseCode}`);
    if (message === "delete") {
      const response = await Api.delete(`/api/courses/${courseCode}`);
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
        });
        setTimeout(() => {
            window.location.reload();
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

        });
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
        transition={Bounce}
        limit={1}
      />{" "}
      {/* Same as */} <ToastContainer />
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#87CEFA", color: "white" }}>
                <TableCell
                  sx={{ color: "white", fontSize: "1rem", fontWeight: "700" }}
                  align="center"
                >
                  {" "}
                  Course Name{" "}
                </TableCell>{" "}
                <TableCell
                  sx={{ color: "white", fontSize: "1rem", fontWeight: "700" }}
                  align="center"
                >
                  {" "}
                  Course Code{" "}
                </TableCell>{" "}
         
                <TableCell
                  sx={{ color: "white", fontSize: "1rem", fontWeight: "700" }}
                  align="center"
                >
                  {" "}
                  Actions{" "}
                </TableCell>{" "}
              </TableRow>{" "}
            </TableHead>{" "}
            <TableBody>
              {" "}
              {data.map((row) => (
                <TableRow>
                  {" "}
                  {/* <TableCell component="th" scope="row">{row.id}</TableCell> */}{" "}
                  <TableCell align="center"> {row.courseName} </TableCell>{" "}
                  <TableCell align="center"> {row.courseCode} </TableCell>{" "}
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handelClick("getDetails", row.courseCode);
                      }}
                    >
                      <SearchIcon color="action" />
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        handelClick("delete", row.courseCode);
                      }}
                    >
                      <DeleteIcon color="action" />
                    </Button>{" "}
                  </TableCell>{" "}
                </TableRow>
              ))}{" "}
            </TableBody>{" "}
          </Table>{" "}
        </TableContainer>{" "}
      </Container>{" "}
    </>
  );
};


const CourseTable = () => {
  const [data, setData]=useState([]);
  useEffect(()=>{
    const response=async()=>{
        const result= await Api.get('/api/courses');
        console.log(result.data);
        if(result) setData(result.data);
    };
    response();
   

  },[])
  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        {" "}
        <h1> Courses </h1>
      </Box>
       <CourseTableImpl data={data}/>
    </div>
  );
};

export default CourseTable;
