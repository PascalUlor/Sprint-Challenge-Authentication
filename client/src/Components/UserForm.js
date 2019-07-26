import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProjectContext from '../App';

const UserForm = ({ props }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });
  const value = useContext(ProjectContext);

  const baseUrl = `http://localhost:3300/api`;

  const handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewUser(newUser => ({ ...newUser, [name]: value }));
  };

  const registerUser = event => {
    event.preventDefault();
    let UserDeet = {
      username: newUser.username,
      password: newUser.password
    };
    axios
      .post(`${baseUrl}/register`, UserDeet)
      .then(res => {
        console.log(res);
        if (res.data.data[0].token) {
          props.history.push('/login');
        }
      })
      .catch(err => console.log(err));
    setNewUser({
      username: '',
      password: ''
    });
  };

  const loginUser = event => {
    event.preventDefault();
    let UserDeet = {
      username: newUser.username,
      password: newUser.password
    };
    console.log('user deet', UserDeet);
    axios
      .post(`${baseUrl}/login`, UserDeet)
      .then(res => {
        console.log(res.data.data[0].token);
        localStorage.setItem('token', res.data.data[0].token);
        value.fetch();
        props.history.push('/');
      })
      .catch(err => console.log(err));
    setNewUser({
      username: '',
      password: ''
    });
  };

  const Method = props.match.path === '/login' ? loginUser : registerUser;
  const ButtonText = props.match.path === '/login' ? 'Login' : 'Sign Up';

  return (
    <Cover>
      <Form onSubmit={Method}>
        <input
          type="text"
          placeholder="Enter Userame"
          value={newUser.username}
          onChange={handleInputChange}
          name="username"
        />
        <input
          type="text"
          placeholder="Enter Password"
          value={newUser.password}
          onChange={handleInputChange}
          name="password"
        />
        <button>{ButtonText}</button>
      </Form>
    </Cover>
  );
};

const Cover = styled.div`
  background-color: skyblue;
  margin: 0 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  padding: 2rem;
  input {
    height: 2rem;
    width: 10rem;
    border: 1px solid skyblue;
  }
  textarea {
    border: 1px solid skyblue;
    height: 3rem;
    width: 15rem;
  }
  button {
    background-color: #41422e;
    color: #fff;
    border-radius: 8px;
    width: 5rem;
    height: 2rem;
  }
`;

export default UserForm;
