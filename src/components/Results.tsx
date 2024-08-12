import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../store';
import { resetTest } from '../store/rootSlice';
import { dictionary } from './dictionary';

export const Results: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wordsPerMinute, errors } = useSelector((state: RootState) => state.root);

  const handleRestart = () => {
    dispatch(resetTest());
  };

  return (
    <ResultsContainer>
      <h2>{dictionary.results}</h2>
      <p>{`${dictionary.wpm}: ${wordsPerMinute}`}</p>
      <p>{` ${dictionary.error}: ${errors}`}</p>
      <Button onClick={handleRestart}>Restart</Button>
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
`;
