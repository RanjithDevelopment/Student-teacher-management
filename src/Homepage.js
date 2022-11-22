import React,{ useState,useEffect }from "react";
import axios from "axios";
import Login from "./components/login";
import './App.css';

function Hompage() {

  //all State variables 
  
  const [loginname, setLoginname] = useState("");
  const [loginstate, setLogin] = useState(false);
 
  const [apidata,setApidata]=useState([])


  //mounting phase of the component
  useEffect(() => {
    async function getApiData() {
        const result = await axios.get('https://6321f66582f8687273bdac1b.mockapi.io/users');
        setApidata(result.data);
    //finding the student in a  database

    }
    getApiData();
}, []);

let SearchedValues={
  name:"",
  age:"",
  email:"",
  course:""

}

  const handlelogin = (text) => {

    setLoginname(text);
    setLogin("True");


  }
  
  let s="";
  const handleOnChange=(e)=>{
s=e;

  }
//   const handleSearch=()=>{
//     apidata.map((data)=>{
// if(s===data.name){
  
//   SearchedValues={
//     name:data.name,
//     age:data.age,
//     email:data.email,
//     course:data.courses
//   }
//   console.log(SearchedValues);

// }
//     })
//   }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark" style={{ backgroundcolor: "#e3f2fd" }}>
        <div className="container-fluid">
          <a className="navbar-brand" >Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={(e) => { handlelogin(e.target.innerHTML) }}>Teacher</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={(e) => { handlelogin(e.target.innerHTML) }}>Student</a>
              </li>
            </ul>
            <input type="text" placeholder="student name" onChange={(e)=>handleOnChange(e.target.value)}/>
              <button >search</button>            
             
              
             
          </div>
        </div>
      </nav>
     
     
      {loginstate ? <Login login={loginname} /> : <></>}
    </>

  );

}
export default Hompage;