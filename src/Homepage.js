import React,{ useState,useEffect }from "react";
import axios from "axios";
import Login from "./components/login";
import './App.css';

function Hompage() {

  //all State variables 
  
  const [loginname, setLoginname] = useState("");
  const [loginstate, setLogin] = useState(false);
  


  //mounting phase of the component
 

  const handlelogin = (text) => {

    setLoginname(text);
    setLogin("True");


  }
  
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
            <form className="d-flex">
              <input className="form-control me-2" />
              <button className=" btn btn-dark" >Search</button>
            </form>
          </div>
        </div>
      </nav>

      {loginstate ? <Login login={loginname} /> : <></>}
    </>

  );

}
export default Hompage;