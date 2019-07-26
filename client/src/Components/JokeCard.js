import React, { useContext } from 'react';
import styled from 'styled-components';
import ProjectContext from '../App';

const JokeCard = props => {
  const value = useContext(ProjectContext);
  return (
    <div>
      {value.jokes.map(joke => {
        return (
          <Card key={joke.id}>
            <p>{joke.joke}</p>
          </Card>
        );
      })}
    </div>
  );
};

const Card = styled.div`
  max-width: 350px;
  height: 8rem;
  background-color: rgba(65, 66, 46, 0.8);
  margin: 1rem auto;
  line-height: 2rem;
  color: #9399a4;
`;

export default JokeCard;
