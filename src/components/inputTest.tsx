import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateUserInput, startTest } from '../store/rootSlice';
import styled from 'styled-components';
import { dictionary } from './dictionary';
import { resultInput } from './constants';

export const InputTest: React.FC = () => {
    const [isEditTextField, setIsEditTextField] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { text, userInput, errors, wordsPerMinute } = useSelector((state: RootState) => state.root);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUserInput(e.target.value));
  };

  const handleStart = () => {
    setIsEditTextField(true);
    dispatch(startTest());
  };

  return (
    <Container>
      <TextDisplay>
        {text.split('').map((char: string | number, index: number) => (
          <span
            key={index}
            style={{
              color: userInput[index] === char ? resultInput.success : userInput[index] ? resultInput.error : resultInput.default,
            }}
          >
            {char}
          </span>
        ))}
      </TextDisplay>
      <InputField value={userInput} onChange={handleChange} disabled={!isEditTextField}/>
      <Button onClick={handleStart} disabled={isEditTextField}>{!isEditTextField ? dictionary.start : dictionary.process}</Button>
      <Stats>
        <p>{`${dictionary.wpm}: ${wordsPerMinute}`}</p>
        <p>{` ${dictionary.error}: ${errors}`}</p>
      </Stats>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: lightGrey;
`;

const TextDisplay = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Stats = styled.div`
  font-size: 16px;
`;
