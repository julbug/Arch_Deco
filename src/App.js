import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import SignIn from './components/auth/sign-in.components';
import SignUp from './components/auth/sign-up.component';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import { AuthProviderWrapper } from './context/UserContext';

import NavBar from "./components/NavBar/NavBar";
import AllServices from './components/Services/AllServices';
import CreateService from "./components/Services/CreateService";
import ServiceDetails from "./components/Services/ServiceDetails";
import AllAppointments from "./components/Appointments/AllAppointments";
import CreateAppointment from "./components/Appointments/CreateAppointment";
import AppointmentDetails from "./components/Appointments/AppointmentDetails";
import Home from "./components/Home/Home"
import Contact from "./components/Contact/Contact";

import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const SERVER_URL = "https://producer-e8hr.onrender.com";
// const SERVER_URL = "http://localhost:4200";


function App() {

  
  // useEffect(() => {
  //   axios.get('https://producer-e8hr.onrender.com/api')
  //   .then((response) => {
  //     // console.log(response);

  //   })
  // }, [] ); 

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = ()=>{
    axios.get(SERVER_URL + "/appointments")
      .then((response)=>{
          console.log(response.data);
          setAppointments(response.data);
      })
      .catch((err)=>{
          console.log(err);
      })
  }


  useEffect(()=>{
      fetchAppointments();
  }, [])

  const [services, setServices] = useState([]);

  const fetchServices = ()=>{
    axios.get(SERVER_URL + "/services")
      .then((response)=>{
          console.log(response.data);
          setServices(response.data);
      })
      .catch((err)=>{
          console.log(err);
      })
  }


  useEffect(()=>{
    fetchServices();
  }, []);

  
  return (
    
    <div className="App">

    <AuthProviderWrapper>
      
      <NavBar />

      <Routes>
          {/* <Route 
          path='/login' 
          element={ <IsAnon> <SignIn /> </IsAnon>  } />
          <Route 
          path='/signup' 
          element={ <IsAnon> <SignUp /> </IsAnon>  } />
          <Route 
          path='/beats' 
          element={ <IsPrivate> <Beats /> </IsPrivate>  } />

          <Route 
          path='/profile'
          element={ <IsPrivate> <Profile /> </IsPrivate> } />

          <Route
          path='/about'
          element={ <IsAnon> <About /> </IsAnon>} />

          <Route
          path='/contact'
          element={ <IsAnon> <Contact /> </IsAnon>} />

          <Route
          path='/music'
          element={ <IsAnon> <Music /> </IsAnon>} />

          <Route
          path='/cart'
          element={ <IsAnon> <Cart /> </IsAnon>} /> */}

          <Route path="/" element = { <Home /> } />


<Route path="/services" element = {<AllServices />} />

<Route path="/services/create" element = {<CreateService fetchServices = {fetchServices} />  } />

<Route path="/services/:id" element = {<ServiceDetails />} />

<Route path="/appointments" element = {<AllAppointments />  } />

<Route path="/appointments/create" element = {<CreateAppointment fetchAppointments={fetchAppointments} services={services}/>} />

<Route path="/appointments/:id" element = {<AppointmentDetails /> } />

<Route path='/login'  element={  <SignIn /> } />
<Route path='/signup' element={  <SignUp /> } />


{/* PAGE ROUTES */}
<Route path="/about" element = {<About /> } />

<Route path="/contact" element = {<Contact /> } />

<Route path="/gallery" element = {<Gallery /> } />

<Route path="/FAQ" element = {<FAQ /> } />
 
      </Routes>
      
    {/* <Routes>
      <Route path='/' element={ <HomePage /> } />
      
    </Routes> */}

    </AuthProviderWrapper>
      
    </div>

    
  );
}

export default App;
