import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { IAppState, isAppStarted, appStartAction } from './getStore';
import Score from './components/Score/Score';
import BattleField from './components/BattleField/BattleField';

export interface Props {
  started: boolean;
  onStart: () => void;
}

export const AppRoot: FC<Props> = ({ started, onStart }) => {
  useEffect(() => {
    onStart();
  }, [onStart]);

  if (!started) {
    return <span className="loading">Loading...</span>;
  }

  return (
    <div className="app">
      <Score />
      <BattleField />
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const started = isAppStarted(state);
  return {
    started,
  };
};

export const mapDispatchToProps = {
  onStart: appStartAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppRoot);
export default App;
