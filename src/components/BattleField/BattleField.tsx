import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './BattleField.css';
import {
  IAppState,
  getScore,
  getRound,
  scoreSetAction,
  roundSetAction,
  getBattleIsActive,
} from '../../getStore';
import { ScoreType } from '../../services/app.types';
import BattleComponent from '../Battle/Battle';
import ResultComponent from '../Result/Result';
import WarriorsChoiseComponent from '../WarriorsChoise/WarriorsChoise';

export interface Props {
  score: ScoreType;
  round: number;
  battleIsActive: boolean;
  handleSetScore: Function;
  handleSetRound: Function;
}

export const BattleField: FC<Props> = ({ battleIsActive, round }) => {
  const [activeComponent, setActiveComponent] = useState({
    choice: false,
    battle: true,
    result: false,
  });

  const { choice, battle, result } = activeComponent;

  useEffect(() => {
    if (round < 20 && !battleIsActive)
      setActiveComponent({ choice: true, battle: false, result: false });
    if (round <= 20 && battleIsActive)
      setActiveComponent({ choice: false, battle: true, result: false });
    if (round === 20 && !battleIsActive)
      setActiveComponent({ choice: false, battle: false, result: true });
  }, [battleIsActive, round]);

  return (
    <div className="battlefield-root">
      {choice && <WarriorsChoiseComponent />}
      {battle && <BattleComponent />}
      {result && <ResultComponent />}
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const score = getScore(state);
  const round = getRound(state);
  const battleIsActive = getBattleIsActive(state);

  return {
    score,
    round,
    battleIsActive,
  };
};

export const mapDispatchToProps = {
  handleSetScore: scoreSetAction,
  handleSetRound: roundSetAction,
};

const BattleFieldComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleField);
export default BattleFieldComponent;
