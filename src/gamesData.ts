import { Game } from './types';

export const games: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    url: 'https://play2048.co/',
    category: 'Puzzle',
    rating: 4.8
  },
  {
    id: 'tetris',
    title: 'Block Puzzle',
    description: 'Classic block-stacking strategy game.',
    thumbnail: 'https://picsum.photos/seed/tetris/400/300',
    url: 'https://tetris.com/play-tetris',
    category: 'Retro',
    rating: 4.9
  },
  {
    id: 'snake',
    title: 'Serpent',
    description: 'Navigate the serpent and consume the orbs.',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    url: 'https://www.google.com/logos/2010/pacman10-i.html', // Using a classic doodle as a proxy
    category: 'Retro',
    rating: 4.5
  },
  {
    id: 'chess',
    title: 'Grandmaster Chess',
    description: 'The ultimate game of strategy and intellect.',
    thumbnail: 'https://picsum.photos/seed/chess/400/300',
    url: 'https://www.chess.com/play/online',
    category: 'Strategy',
    rating: 4.7
  },
  {
    id: 'dino',
    title: 'Runner Pro',
    description: 'Endless desert running experience.',
    thumbnail: 'https://picsum.photos/seed/dino/400/300',
    url: 'https://chromedino.com/',
    category: 'Action',
    rating: 4.2
  },
  {
    id: 'sudoku',
    title: 'Logic Grid',
    description: 'Challenge your mind with number placement.',
    thumbnail: 'https://picsum.photos/seed/sudoku/400/300',
    url: 'https://www.websudoku.com/',
    category: 'Puzzle',
    rating: 4.6
  }
];
