// import axios from 'axios';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import AxiosWithHeader from './axios';
import styled from 'styled-components';
import JokeCard from './Components/JokeCard';
import UserForm from './Components/UserForm';

const baseUrl = `http://localhost:3300/api`;

const ProjectContext = React.createContext();

export function App(props) {
  const [jokes, setJokes] = useState([]);

  const FetchJokes = () => {
    AxiosWithHeader()
      .get(`${baseUrl}/jokes`)
      .then(res => {
        setJokes(res.data);
      })
      .catch(err => {
        return err.statusText;
      });
  };

  return (
    <ProjectContext.Provider
      value={{
        jokes: jokes,
        fetch: FetchJokes
      }}
    >
      <Header> Dad Jokes</Header>
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

          <Route path="/login" render={props => <UserForm props={props} />} />
          <Route path="/signup" render={props => <UserForm props={props} />} />
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
