import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Css/student.css'
import { useParams } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import {Typography,Card} from '@mui/joy';
//import Button from '@mui/joy/Button';
//import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
//import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import image from '../course.png'
 import Grid from '@mui/material/Grid';

function Student() {
    const params = useParams();
 
    //here is the response data for students
    const [studentData, setStudentData] = useState([]);
    //mounting phase of component
    let name = "";
    let mail = "";
    let course = "";
    studentData.map((data) => {
        
        if (data.id === params.id) {

         
          name=data.name;
          mail=data.email;
          course=data.courses;
        }

    });
    
    useEffect(() => {
        async function getApiData() {
            const result = await axios.get('https://6321f66582f8687273bdac1b.mockapi.io/users');
            setStudentData(result.data);
        //finding the student in a  database
   
        }
        getApiData();
    }, []);
  
   
    return (
        <>
            <h1>Hello welcome Student</h1>
            <div className="student">
              
                <h3 className="text">Student Name :{name}</h3> <br/>
                <h3 className="text">email Id :{mail}</h3> <br/>
              
                
                <Grid  container spacing={2}>
<Grid item xs={4}>
<Card  variant="outlined" sx={{ width: 320 }} >
  <Typography fontSize="md" sx={{ mb: 0.5 }}>
  student course : {course}
  </Typography>
  <Typography level="body2"></Typography>
  <IconButton
    aria-label="bookmark Bahamas Islands"
    variant="plain"
    color="neutral"
    size="sm"
    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
  >
    <BookmarkAdd />
  </IconButton>
  <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
    <img
      src={image}
      srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
      loading="lazy"
      alt=""
    />
  </AspectRatio>
</Card>
  </Grid>
   </Grid>
            </div>
        </>
    );
}
export default Student;