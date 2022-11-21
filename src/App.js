import { BrowserRouter,Routes,Route,Outlet } from 'react-router-dom';
import './App.css';
import Teacher from './components/Teacher';
import Student from './components/Student';
import Hompage   from './Homepage';

function App() {
  return (

    <div className='App'>
<h1>Welcome To Student Teacher Management System !!!</h1>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Hompage/>}/>
  
  <Route path='/Teacher/:id' element={<Teacher/>}/>
  <Route path='/Student/:id' element={<Student/>}/>
  
  </Routes>
</BrowserRouter>
        </div>
  );
}

export default App;
