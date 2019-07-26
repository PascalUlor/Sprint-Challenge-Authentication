import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import JokeCard from './Components/JokeCard';
import UserForm from './Components/UserForm';

const baseUrl = `http://localhost:3300/api`;

const ProjectContext = React.createContext();

export function App() {
  const [jokes, setJokes] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewUser(newUser => ({ ...newUser, [name]: value }));
  };

  const FetchJokes = () => {
    axios
      .get(`${baseUrl}`)
      .then(res => {
        setJokes(res.data.data);
      })
      .catch(err => {
        return err.statusText;
      });
  };

  const registerUser = event => {
    event.preventDefault();
    let CharDeet = {
      username: newUser.username,
      password: newUser.password
    };
    axios
      .post(`${baseUrl}/register`, CharDeet)
      .then(res => {})
      .catch(err => console.log(err));
    setNewUser({
      name: '',
      description: ''
    });
    FetchJokes();
  };

  const loginUser = event => {
    event.preventDefault();
    let CharDeet = {
      username: newUser.username,
      password: newUser.password
    };
    axios
      .post(`${baseUrl}/login`, CharDeet)
      .then(res => {})
      .catch(err => console.log(err));
    setNewUser({
      name: '',
      description: ''
    });
    FetchJokes();
  };

  useEffect(FetchJokes, []);

  return (
    <ProjectContext.Provider
      value={{
        jokes: jokes,
        regUser: registerUser,
        loginUser: loginUser,
        handleInputChange: handleInputChange
      }}
    >
      <Header> Lord Of The Rings</Header>
      <Main>
        <Router>
          <h1>Dad Jokes</h1>
          <div>
            You Are Welcome
            <p>Signup for some jokes</p>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
          <Route
            exact
            path="/"
            render={props => {
              if (localStorage.getItem('token')) {
                return <JokeCard />;
              }
              return <Redirect to="login" />;
            }}
          />

          <Route path="/login" component={UserForm} />
          <Route path="/signup" component={UserForm} />
        </Router>
      </Main>
    </ProjectContext.Provider>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(80, 68, 18, 0.6) 10%, transparent),
    url(https://previews.123rf.com/images/lilu330/lilu3301509/lilu330150900023/44524749-seamless-pattern-with-funny-cartoon-faces-on-yellow-background.jpg)
      center/cover no-repeat border-box,
    skyblue;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  text-align: center;
`;

const Header = styled.h1`
  @import url('https://fonts.googleapis.com/css?family=Petrona&display=swap');
  font-family: 'Petrona', serif;
  text-align: center;
  margin: 0 auto;
  font-size: 2rem;
`;

export default ProjectContext;
