import React from 'react';
import {Results} from './components/Results';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import {GlobalStyles} from './styles';
import {InputTest} from './components/inputTest';

const App: React.FC = () => {
  const { userInput, text } = useSelector((state: RootState) => state.root);

  return (
    <div>
      <GlobalStyles />
      <InputTest />
      {userInput === text && <Results />}
    </div>
  );
};

export default App;
