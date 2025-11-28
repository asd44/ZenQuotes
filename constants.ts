import { Category, Quote } from './types';

// This is your "simple file locally" to add new quotes.
// Just add a new object to this array.

export const INITIAL_QUOTES: Quote[] = [
  {
    id: '1',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: Category.SUCCESS
  },
  {
    id: '2',
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: Category.HAPPINESS
  },
  {
    id: '3',
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    category: Category.GYM
  },
  {
    id: '4',
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: Category.SUCCESS
  },
  {
    id: '5',
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: Category.HAPPINESS
  },
  {
    id: '6',
    text: "No pain, no gain. Shut up and train.",
    author: "Unknown",
    category: Category.GYM
  },
  {
    id: '7',
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: Category.WISDOM
  },
  {
    id: '8',
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: Category.SUCCESS
  },
  {
    id: '9',
    text: "Strength does not come from physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi",
    category: Category.GYM
  },
  {
    id: '10',
    text: "Count your age by friends, not years. Count your life by smiles, not tears.",
    author: "John Lennon",
    category: Category.HAPPINESS
  },
  {
    id: '11',
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: Category.SUCCESS
  },
  {
    id: '12',
    text: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle",
    category: Category.WISDOM
  }
];

export const CATEGORIES = Object.values(Category);
