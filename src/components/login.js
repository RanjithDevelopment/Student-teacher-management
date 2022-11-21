import React,{useState,useEffect}from "react";
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
// import Teacher from "./Teacher";
// import Student from "./Student";
function Login({login}){
  const navigate=useNavigate();
  //Mouting Pahse of the login component
  let logedUser=login;
  
  useEffect(()=>{
   async function fetchdata(){
    if(login==='Teacher'){
      const apiResponse=await axios.get('https://6321f66582f8687273bdac1b.mockapi.io/teachers')
    
      setapidata(apiResponse.data);
      }else{
        const apiResponse=await axios.get('https://6321f66582f8687273bdac1b.mockapi.io/users')
 
        setapidata(apiResponse.data);
      }
    }
    fetchdata();
  },[]);
  let formvalues={
    email:"",
  name:"",
    error:{
      email:"",
      name:""
    }
  }
  //response data from api
  const[apidata,setapidata]=useState();
 
//logindata 
  const[logindata,setlogindata]=useState(formvalues); 
  //to validate user 
  const[user,setUser]=useState(false);
//to handle the login process
  const handlelogin=()=>{
    const abc = apidata.map((reply)=>{
    
      if(logindata.email===reply.email&&logindata.name===reply.name){
      setUser(!user);
      let a=reply.id;
     
       navigate(`/${login}/${a}`);
       
      }
       else{
        console.log('failed');
       }
      
      });
      

  }
// here to get the values from input field 
  const commonchange=(e)=>{
let error={...logindata.error}
if (e.target.value === "") {

  error[e.target.name] = `${e.target.name} is Required`;
} else {

  error[e.target.name] = "";
}
setlogindata({ ...logindata, [e.target.name]: e.target.value, error });


  };
  
    return(
        <div className="formcontainer" >
  <CssVarsProvider>


      <main >
        
        <Sheet
          sx={{
            maxWidth: 400,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
        
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome To {login} Login !!</b><br/>
             
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
           onChange={(e)=>commonchange(e)}
            
            placeholder="ranjith@guvi.in"
            // pass down to FormLabel as children
            label="Email"
          /><br/>
      <span style={{ color: 'red' }}>{logindata.error.email}</span>
          <TextField
            name="name"
            type="name"
            onChange={(e)=>commonchange(e)}
            placeholder="name"
            label="name"
          /><br/>
          <span style={{ color: "red" }}>{logindata.error.name}</span>
          <Button
            sx={{
              mt: 1, // margin top
            }}
            // component={Link}
            // to={logedUser==='Teacher'?"/Teacher":"/Student"}
           onClick={()=>handlelogin()}
           value={login}
          >
            Log in
          </Button>
          
            Don&apos;t have an account? 
            <Button size="large" variant='Outlined' color="info" >
         Sign UP!
        </Button>
          
        </Sheet>
      </main>
     
      
    </CssVarsProvider>
  
        </div>
    );
}
export default Login;
