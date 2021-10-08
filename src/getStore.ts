import {
  Action,
  ActionCreator,
  applyMiddleware,
  createStore,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ScoreType, WarriorType } from './services/app.types';
import { emptyWarrior } from './services/constants';

// action type(s)
export const APP_START = 'APP_START';
export type APP_START = typeof APP_START;
export interface IAppStartAction extends Action<APP_START> {
  type: APP_START;
  value?: string;
}

export const SCORE_SET = 'SCORE_SET';
export type SCORE_SET = typeof SCORE_SET;
export interface IScoreSetAction extends Action<SCORE_SET> {
  type: SCORE_SET;
  score: ScoreType;
}

export const ROUND_SET = 'ROUND_SET';
export type ROUND_SET = typeof ROUND_SET;
export interface IRoundSetAction extends Action<ROUND_SET> {
  type: ROUND_SET;
  round: number;
}

export const HUMAN_WARRIOR_SET = 'HUMAN_WARRIOR_SET';
export type HUMAN_WARRIOR_SET = typeof HUMAN_WARRIOR_SET;
export interface IHumanWarriorSetAction extends Action<HUMAN_WARRIOR_SET> {
  type: HUMAN_WARRIOR_SET;
  humanWarrior: WarriorType;
}

export const COMPUTER_WARRIOR_SET = 'COMPUTER_WARRIOR_SET';
export type COMPUTER_WARRIOR_SET = typeof COMPUTER_WARRIOR_SET;
export interface IComputerWarriorSetAction
  extends Action<COMPUTER_WARRIOR_SET> {
  type: COMPUTER_WARRIOR_SET;
  computerWarrior: WarriorType;
}

export const BATTLE_IS_ACTIVE_SET = 'BATTLE_IS_ACTIVE_SET';
export type BATTLE_IS_ACTIVE_SET = typeof BATTLE_IS_ACTIVE_SET;
export interface IBattleIsActiveSetAction extends Action<BATTLE_IS_ACTIVE_SET> {
  type: BATTLE_IS_ACTIVE_SET;
  battleIsActive: boolean;
}

export const STATE_RESET = 'STATE_RESET';
export type STATE_RESET = typeof STATE_RESET;
export interface IStateResetAction extends Action<STATE_RESET> {
  type: STATE_RESET;
  value?: null;
}

export type AppActions =
  | IAppStartAction
  | IScoreSetAction
  | IRoundSetAction
  | IBattleIsActiveSetAction
  | IStateResetAction
  | IComputerWarriorSetAction
  | IHumanWarriorSetAction;

// action builder(s)
export const appStartAction: ActionCreator<IAppStartAction> = (value = '') => ({
  type: APP_START,
  value,
});

export const scoreSetAction: ActionCreator<IScoreSetAction> = (
  score: ScoreType
) => ({
  type: SCORE_SET,
  score,
});

export const roundSetAction: ActionCreator<IRoundSetAction> = (
  round: number
) => ({
  type: ROUND_SET,
  round,
});

export const humanWarriorSetAction: ActionCreator<IHumanWarriorSetAction> = (
  humanWarrior: WarriorType
) => ({
  type: HUMAN_WARRIOR_SET,
  humanWarrior,
});

export const computerWarriorSetAction: ActionCreator<IComputerWarriorSetAction> = (
  computerWarrior: WarriorType
) => ({
  type: COMPUTER_WARRIOR_SET,
  computerWarrior,
});

export const battleIsActiveSetAction: ActionCreator<IBattleIsActiveSetAction> = (
  battleIsActive: boolean
) => ({
  type: BATTLE_IS_ACTIVE_SET,
  battleIsActive,
});

export const stateResetAction: ActionCreator<IStateResetAction> = (
  value = null
) => ({
  type: STATE_RESET,
  value,
});

// state definition
export interface IAppState {
  started: boolean;
  score: ScoreType;
  round: number;
  battleIsActive: boolean;
  humanWarrior: WarriorType;
  computerWarrior: WarriorType;
}

export const initialState: IAppState = {
  started: false,
  score: {
    computer: 0,
    human: 0,
  },
  round: 0,
  battleIsActive: false,
  humanWarrior: emptyWarrior,
  computerWarrior: emptyWarrior,
};

// app reducer
export function appReducer(
  state: IAppState = initialState,
  action: AppActions
): IAppState {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        started: true,
      };
    case SCORE_SET:
      return {
        ...state,
        score: action.score,
      };
    case ROUND_SET:
      return {
        ...state,
        round: action.round,
      };
    case BATTLE_IS_ACTIVE_SET:
      return {
        ...state,
        battleIsActive: action.battleIsActive,
      };
    case HUMAN_WARRIOR_SET:
      return {
        ...state,
        humanWarrior: action.humanWarrior,
      };
    case COMPUTER_WARRIOR_SET:
      return {
        ...state,
        computerWarrior: action.computerWarrior,
      };
    case STATE_RESET:
      return {
        ...initialState,
        started: true,
      };
    default:
      return state;
  }
}

// started state selector
export const isAppStarted = (state: IAppState) => state.started;

// score selector
export const getScore = (state: IAppState) => state.score;

// round selector
export const getRound = (state: IAppState) => state.round;

// HumanWarrior selector
export const getHumanWarrior = (state: IAppState) => state.humanWarrior;

// ComputerWarrior selector
export const getComputerWarrior = (state: IAppState) => state.computerWarrior;

// battleIsActive selector
export const getBattleIsActive = (state: IAppState) => state.battleIsActive;

export type AppStore = Store<IAppState, AppActions>;

export default function getStore(): AppStore {
  const store = createStore(appReducer, composeWithDevTools(applyMiddleware()));
  return store;
}
