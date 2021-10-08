import { WarriorType } from './app.types';
import { warriorsArray } from './constants';

const checkWinner = (
  humansWarrior: WarriorType | null,
  computersWarrior: WarriorType | null
): string => {
  if (!humansWarrior || !computersWarrior)
    throw Error('Need warriors to check winner');

  const { title: hWarrTitle, defeats: hWarrDefeats } = humansWarrior;
  const { title: cWarrTitle } = computersWarrior;

  if (hWarrTitle === cWarrTitle) return 'draw';
  if (hWarrDefeats === cWarrTitle) return 'human';

  return 'computer';
};

const getRandomIntLimit = (limit: number = 0): number =>
  Math.floor(Math.random() * limit);

const randomWarrior = (): WarriorType => {
  const tmpWarriorsArray = [...warriorsArray];
  const mostPossibleIndex = getRandomIntLimit(tmpWarriorsArray.length - 1);
  const mostPossibleWarrior = tmpWarriorsArray[mostPossibleIndex];
  const randomNum = Math.random();

  tmpWarriorsArray.splice(mostPossibleIndex, 1);

  if (randomNum <= 0.5) return mostPossibleWarrior;
  if (randomNum <= 0.75) return tmpWarriorsArray[0];

  return tmpWarriorsArray[1];
};

export { checkWinner, getRandomIntLimit, randomWarrior };
