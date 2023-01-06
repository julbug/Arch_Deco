import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/UserContext";
import axios from "axios";
import '../profile/profile.styles.css'
import EditBeatForm from "../beats/editBeat.component";
import UpdateProfileForm from "./updateProfile.component";
import { useNavigate } from "react-router-dom";
const API_URL = 'https://producer-e8hr.onrender.com';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext);
    console.log(setUser)
    const [ beats, setBeats ] = useState([]);
    const [name, setName] = useState(user.name);
    const [location, setLocation] = useState(user.location);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    
    const navigate = useNavigate();    
    
    // Send user id to the backend to use the User.findById
    useEffect(() => {
        const requestBody = { user: user._id };
        axios.post(`${API_URL}/profile`, requestBody)
        .then((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        });
        axios.get(`${API_URL}/profile`)
          .then(response => setBeats(response.data.beats))
          .catch(error => console.log(error));
        console.log({BREAK: beats})
    }, []);

    const updateProfileInfo = (name, location) => {
        const requestBody = { name, location };
        axios.put(`${API_URL}/users/${user._id}`, requestBody)
          .then(response => {
            console.log(response);
            // Update the user state with the updated user info
            setUser({ ...user, name, location });
            // Update the name and location state variables
            setName(name);
            setLocation(location);
            // Hide the form
            setShowUpdateForm(false);
          })
          .catch(error => {
            console.log(error);
          });
      }

    const deleteUser = (userId) => {
        console.log(userId)
        if (window.confirm('Are you sure you want to delete your account?')) {
        axios.delete(`${API_URL}/users/${userId}`)
            .then(response => {
            console.log(response);
            // navigate to the login page or show a message to the user
            navigate('/login');
        })
        .catch(error => {
            console.log(error);
        });
        }
    }

    const deleteTrack = (beatId) => {
        axios.delete(`${API_URL}/beats/${beatId}`)
          .then(response => {
            // Update the beats state by removing the deleted beat
            setBeats(beats.filter(beat => beat._id !== beatId));
          })
          .catch(error => {
            console.log(error);
          });
      };


      const editTrack = (beatId, newBeat) => {
        axios.put(`${API_URL}/beats/${beatId}`, newBeat)
          .then(response => {
            // Update the beats state with the updated beat
            setBeats(beats.map(beat => beat._id === beatId ? newBeat : beat));
          })
          .catch(error => {
            console.log(error);
          });
      };
    


    return (
        <div className="profile-container">
        <div className="user-profile">
          <div className="profile-card">
            {showUpdateForm ? (
              <UpdateProfileForm user={user} updateProfileInfo={updateProfileInfo} />
            ) : (
              <>
                <h1>{user.name}</h1>
                <h3>{user.location}</h3>
                <button onClick={() => setShowUpdateForm(true)}>Update User Info</button>
              </>
            )}
            <button onClick={() => deleteUser(user._id)}>Delete User</button>
          </div>
        </div>
        <div className="beats-container">
          <h2>Uploaded Beats</h2>

          {beats.map((beat) => (
            <div className="uploaded-beats">
              <li key={beat._id}>
                <h3>{beat.name}</h3>
                <audio controls>
                  <source src={beat.link} type="audio/wav" />
                </audio>
                <EditBeatForm beat={beat} editTrack={editTrack} />
                <button onClick={() => deleteTrack(beat._id)}>Delete</button>
              </li>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Profile;