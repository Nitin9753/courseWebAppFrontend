import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, CircularProgress, Box } from '@mui/material';
import Api from '../Api';

const CourseDetail = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await Api.get(`/api/courses/${courseCode}`);
        setCourse(response.data); // assuming response.data contains courseName, courseCode, courseDescription
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseCode]);

  if (loading) {
    return (
        <Container>
        <Box
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      {course ? (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography align='center' variant="h4" component="div" gutterBottom>
                  {course.courseName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  Course Code: {course.courseCode}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {course.courseDescription}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="error" align="center">
          Course not found.
        </Typography>
      )}
    </Container>
  );
};

export default CourseDetail;
