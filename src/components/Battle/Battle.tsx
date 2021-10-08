import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import './Battle.css';
import {
  IAppState,
  getScore,
  getHumanWarrior,
  getComputerWarrior,
  battleIsActiveSetAction,
  scoreSetAction,
  computerWarriorSetAction,
} from '../../getStore';
import { ScoreType, WarriorType } from '../../services/app.types';
import { checkWinner } from '../../services/utils';

export interface Props {
  humanWarrior: WarriorType | null;
  computerWarrior: WarriorType | null;
  setBattleIsActive: Function;
  setScore: Function;
  score: ScoreType;
}

export const Battle: FC<Props> = ({
  score,
  humanWarrior,
  computerWarrior,
  setBattleIsActive,
  setScore,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      let humanScore = score.human;
      let computerScore = score.computer;

      switch (checkWinner(humanWarrior, computerWarrior)) {
        case 'human':
          humanScore++;
          computerScore--;
          break;
        case 'computer':
          computerScore++;
          humanScore--;
          break;

        default:
          humanScore--;
          computerScore--;
          break;
      }

      setScore({ human: humanScore, computer: computerScore });
      setBattleIsActive(false);
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="battle-root">
      <div className="battle-title">
        <h2>Battle</h2>
      </div>
      <div className="battle-content">
        <div>
          Humans warrior: <b>{humanWarrior?.title}</b>
        </div>
        <div>vs</div>
        <div>
          Computers warrior: <b>{computerWarrior?.title}</b>
        </div>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const score = getScore(state);
  const humanWarrior = getHumanWarrior(state);
  const computerWarrior = getComputerWarrior(state);

  return {
    score,
    humanWarrior,
    computerWarrior,
  };
};

export const mapDispatchToProps = {
  setScore: scoreSetAction,
  setComputerWarrior: computerWarriorSetAction,
  setBattleIsActive: battleIsActiveSetAction,
};

const BattleComponent = connect(mapStateToProps, mapDispatchToProps)(Battle);
export default BattleComponent;
