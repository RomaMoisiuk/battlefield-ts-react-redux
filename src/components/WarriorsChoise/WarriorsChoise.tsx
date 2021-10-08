import React, { FC } from 'react';
import { connect } from 'react-redux';

import './WarriorsChoise.css';
import {
  IAppState,
  getRound,
  humanWarriorSetAction,
  battleIsActiveSetAction,
  computerWarriorSetAction,
  roundSetAction,
} from '../../getStore';
import { WarriorType } from '../../services/app.types';
import { warriorsArray } from '../../services/constants';
import { randomWarrior } from '../../services/utils';

export interface Props {
  round: number;
  setRound: Function;
  setHumanChoice: Function;
  setComputerChoice: Function;
  setBattleIsActive: Function;
}

export const WarriorsChoise: FC<Props> = ({
  round,
  setHumanChoice,
  setComputerChoice,
  setBattleIsActive,
  setRound,
}) => {
  const handleChoice = (warrior: WarriorType): void => {
    const computerWarrior = randomWarrior();
    setHumanChoice(warrior);
    setComputerChoice(computerWarrior);
    setRound(round + 1);
    setBattleIsActive(true);
  };

  return (
    <div className="choice-root">
      <div className="choice-title">
        <h2>Please choose your warrior for next roud</h2>
      </div>
      <div className="warriors-list">
        {warriorsArray.map((warrior) => (
          <button
            className="warrior-item"
            onClick={() => handleChoice(warrior)}
            key={warrior.title}>
            {warrior.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const round = getRound(state);

  return {
    round,
  };
};

export const mapDispatchToProps = {
  setRound: roundSetAction,
  setHumanChoice: humanWarriorSetAction,
  setComputerChoice: computerWarriorSetAction,
  setBattleIsActive: battleIsActiveSetAction,
};

const WarriorsChoiseComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(WarriorsChoise);
export default WarriorsChoiseComponent;
