import React, { FC } from 'react';
import { connect } from 'react-redux';

import './Result.css';
import { IAppState, getScore, stateResetAction } from '../../getStore';
import { ScoreType } from '../../services/app.types';

export interface Props {
  score: ScoreType;
  resetState: Function;
}

export const Result: FC<Props> = ({ score, resetState }) => {
  const { computer, human } = score;
  let winner = computer < human ? 'Human' : 'Computer';

  if (computer === human) winner = 'Draw';

  const handleReset = (): void => {
    resetState();
  };

  return (
    <div className="result-root">
      <div className="result">
        <h2>{winner === 'Draw' ? 'It is Draw' : `${winner} won!!!`}</h2>
      </div>
      <div className="reset">
        <button onClick={handleReset}>Start New Game</button>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const score = getScore(state);

  return {
    score,
  };
};

export const mapDispatchToProps = {
  resetState: stateResetAction,
};

const ResultComponent = connect(mapStateToProps, mapDispatchToProps)(Result);
export default ResultComponent;
