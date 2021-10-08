import React, { FC } from 'react';
import { connect } from 'react-redux';

import './Score.css';
import { IAppState, getScore, getRound } from '../../getStore';
import { ScoreType } from '../../services/app.types';

export interface Props {
  score: ScoreType;
  round: number;
}

export const Score: FC<Props> = ({ score, round }) => {
  const { computer, human } = score;

  return (
    <div className="score-root">
      <div className="score-human">
        <span>Human: {human}</span>
      </div>
      <div className="round">
        <span>Round: {round}</span>
      </div>
      <div className="score-computer">
        <span>Computer: {computer}</span>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const score = getScore(state);
  const round = getRound(state);

  return {
    score,
    round,
  };
};

const ScoreComponent = connect(mapStateToProps)(Score);
export default ScoreComponent;
