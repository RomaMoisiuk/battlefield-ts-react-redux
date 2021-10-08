interface ScoreType {
  computer: number;
  human: number;
}

 
type Warriors = 'Cavalry' | 'Archers' | 'Pikemen' | '';

interface WarriorType {
  title: Warriors;
  defeats: Warriors;
  isDefeatedBy: Warriors
}

export type {
  ScoreType,
  WarriorType,
}