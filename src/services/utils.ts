import { WarriorType } from './app.types';

const checkWinner = (humansWarrior: WarriorType | null, computersWarrior: WarriorType | null): string => {
  if (!humansWarrior || !computersWarrior) throw Error('Need warriors to check winner');

  const { title: hWarrTitle, defeats: hWarrDefeats } = humansWarrior;
  const { title: cWarrTitle } = computersWarrior;

  if (hWarrTitle === cWarrTitle) return 'none';
  if (hWarrDefeats === cWarrTitle) return 'human';

  return 'computer';
};

export { checkWinner };
