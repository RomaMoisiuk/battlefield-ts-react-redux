import { WarriorType } from './app.types';

const cavalryTitle = 'Cavalry';
const archersTitle = 'Archers';
const pikemenTitle = 'Pikemen';

const Cavalry: WarriorType = {
  title: cavalryTitle,
  defeats: archersTitle,
  isDefeatedBy: pikemenTitle,
};

const Archers: WarriorType = {
  title: archersTitle,
  defeats: pikemenTitle,
  isDefeatedBy: cavalryTitle,
};

const Pikemen: WarriorType = {
  title: pikemenTitle,
  defeats: cavalryTitle,
  isDefeatedBy: archersTitle,
};

const emptyWarrior: WarriorType = {
  title: '',
  defeats: '',
  isDefeatedBy: '',
};

const warriorsArray = [Cavalry, Archers, Pikemen];

export { Cavalry, Archers, Pikemen, cavalryTitle, archersTitle, pikemenTitle, warriorsArray, emptyWarrior };
