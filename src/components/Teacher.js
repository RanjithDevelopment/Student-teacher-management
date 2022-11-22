import React,{useEffect,useState}from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Hompage from '../Homepage';


 function Teacher(){
    let formvalues = {
        id: "",
        name: "",
        email: "",
        age: "",
        gender: "",
        courses: "",
        error: {
          name: "",
          email: "",
          age: "",
          gender: "",
          courses: ""
        }
      };
      const [formdata, setformdata] = useState(formvalues);
      const [apidata, setapidata] = useState([]);
      
      //mounting phase of the component 
      useEffect(() => {
        // on mounting phase here i hit the api and get the response
          async function getapidata() {
          const response = await axios.get("https://6321f66582f8687273bdac1b.mockapi.io/users");
    
          setapidata(response.data);
        }
       
        getapidata();
      }, []);
      
      //to handle the editoperation here is the function
      const HandleEdit = (id) => {
        const selecteddata = apidata.filter((row) => row.id === id)[0];
        setformdata({
          ...formdata,
          ...selecteddata
        });
        
    
      };
      // to handle onsubmit form error and create a new data here i used a async await function  
      const handlesubmit = async (event) => {
        event.preventDefault();
        const errorkeys = Object.keys(formdata).filter((key) => {
          if (formdata[key] === "" && key !== "error" && key !== "id") {
            return key
          }
    
        });
        if (errorkeys.length >= 1) {
          alert("Please fill all the field");
        } else {
          // on submit here i check that the action is updation or creation 
          //if it has formdata.id it is updation 
          if (formdata.id) {
            const update = await axios.put(`https://6321f66582f8687273bdac1b.mockapi.io/users/${formdata.id}`, {
              name: formdata.name,
              email: formdata.email,
              age: formdata.age,
              gender: formdata.gender,
              courses: formdata.courses
            });
            let users = [...apidata];
            let index = users.findIndex((row) => row.id === update.data.id);
            users[index] = update.data;
            setapidata(users);
            setformdata(formvalues);
    
            // if it not have formdata.id it is creation
          } else {
            const response = await axios.post("https://6321f66582f8687273bdac1b.mockapi.io/users", {
              name: formdata.name,
              email: formdata.email,
              age: formdata.age,
              gender: formdata.gender,
              courses: formdata.courses
            })
            setapidata([...apidata, response.data]);
            setformdata(formvalues);
          }
        }
      };
      // to handle all the onchange operation here i write a common function 
      const commonchange = (e) => {
        let error = { ...formdata.error };
        if (e.target.value === "") {
    
          error[e.target.name] = `${e.target.name} is Required`;
        } else {
    
          error[e.target.name] = "";
        }
        setformdata({ ...formdata, [e.target.name]: e.target.value, error })
      };
      //here i write the function for handling the delete operations 
      const HandleDelete = async (id) => {
        const deletedata = await axios.delete(`https://6321f66582f8687273bdac1b.mockapi.io/users/${id}`);
        const user = apidata.filter((row) => row.id !== deletedata.data.id);
       setapidata(user);
       
      };
      return (
        <>
        <Hompage/>
        <div style={{ padding: "30px", backgroundColor:"bisque" }}>
       
          <h3>Teachers Can view,edit and create a student!😊</h3>
          <Grid container spacing={2}>
            <Grid item xs={4}>
             <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                onSubmit={(event) => handlesubmit(event)}
                autoComplete="off"
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="standard"
                  value={formdata.name}
                  name="name"
                  onChange={(e) => commonchange(e)} />
                <br />
                <span style={{ color: "red" }}>{formdata.error.name}</span>
                <br />
    
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  value={formdata.email}
                  name="email"
                  onChange={(e) => commonchange(e)} />
                <br />
                <span style={{ color: 'red' }}>{formdata.error.email}</span><br />
                <TextField
                  id="age"
                  type="number"
                  label="Age"
                  variant="standard"
                  value={formdata.age}
                  name="age"
                  onChange={(e) => commonchange(e)} />
                <br />
                <span style={{ color: 'red' }}>{formdata.error.age}</span><br />
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="gender"
                  value={formdata.gender}
                  onChange={(e) => commonchange(e)}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup><br />
                <span style={{ color: 'red' }}>{formdata.error.gender}</span><br />
    
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="course"
                    value={formdata.courses}
                    name="courses"
                    onChange={(e) => commonchange(e)}
                  >
                    <MenuItem value="React">React</MenuItem>
                    <MenuItem value="Node js">Node js</MenuItem>
                    <MenuItem value="Full stack">Full stack</MenuItem>
                  </Select><br />
                  <span style={{ color: 'red' }}>{formdata.error.courses}</span><br />
                </FormControl><br />
                <Button variant="contained" type="submit">submit</Button>
    
              </Box>
            </Grid>
            <Grid item xs={8}>
              <h3>The users in The Site !</h3>
               <TableContainer component={Paper} sx={{ width: 800 }}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID </TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Gender</TableCell>
                      <TableCell align="right">Course</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apidata.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.gender}</TableCell>
                        <TableCell align="right">{row.courses}</TableCell>
                        <TableCell align="right">
                          <Button variant="text" onClick={() => HandleEdit(row.id)}>Edit</Button>
                          <Button variant="text" onClick={() => HandleDelete(row.id)}>Delete</Button>
                        </TableCell>
    
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
    
          </Grid>
    
    
    
        </div>
        </>
      );
 }
 export default Teacher;