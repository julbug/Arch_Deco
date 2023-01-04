import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation.component';
import Beats from './components/beats/beats.component';
import { useEffect, useContext } from 'react'
import axios from 'axios';
import HomePage from './components/homePage/homePage.component';
import SignIn from './components/auth/sign-in.components';
import SignUp from './components/auth/sign-up.component';
import { AuthContext } from './context/auth.context';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Profile from './components/profile/profile.component';
import About from './components/about/about.component';
import Contact from './components/contact/contact.component';
import Music from './components/music/music.component';
import Cart from './components/cart/cart.component';





function App() {

  
  useEffect(() => {
    axios.get('https://producer-e8hr.onrender.com/api')
    .then((response) => {
      // console.log(response);

    })
  }, [] ); 

  
  return (
    
    <div className="App">
      
        <Navigation />
      <Routes>
          <Route 
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
          element={ <IsAnon> <Cart /> </IsAnon>} />
      </Routes>
      
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      
    </Routes>

    
      
    </div>

    
  );
}

export default App;
