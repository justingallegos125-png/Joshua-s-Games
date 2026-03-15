export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: 'Action' | 'Puzzle' | 'Retro' | 'Strategy' | 'Sports';
  rating: number;
}
