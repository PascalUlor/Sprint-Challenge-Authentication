import React, { useContext } from 'react';
import styled from 'styled-components';
import ProjectContext from '../App';

const UserForm = () => {
  const value = useContext(ProjectContext);
  return (
    <Cover>
      <Form>
        <input type="text" placeholder="Enter Userame" name="name" />
        <input type="text" placeholder="Enter Password" name="password" />
        <button>Submit</button>
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
