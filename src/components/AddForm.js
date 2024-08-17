import React, { useState } from "react";
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Box
} from "@mui/material";
import AddInstanceForm from "./AddInstance";
import AddCourseForm from "./AddCourse";
function AddForm() {
  const [selection, setSelection] = useState("course");

  const handleSelection = (event, newSelection) => {
    if (newSelection !== null) {
      setSelection(newSelection);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <ToggleButtonGroup
          value={selection}
          exclusive
          onChange={handleSelection}
          ariaLabel="add form selection"
        >
          <ToggleButton value="course" ariaLabel="add course">
            Add Course{" "}
          </ToggleButton>{" "}
          <ToggleButton value="instance" ariaLabel="add instance">
            Add Instance{" "}
          </ToggleButton>{" "}
        </ToggleButtonGroup>{" "}
      </Box>
    
      {selection === "course" ? <AddCourseForm /> : <AddInstanceForm />}{" "}
    </Container>
  );
}
export default AddForm;