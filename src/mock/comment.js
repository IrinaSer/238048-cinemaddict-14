/* global require */
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common.js';

const commentTexts = ['Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh', 'Almost two hours? Seriously?'];

const authors = ['Tim Macoveev', 'John Doe'];

const emoji = ['angry', 'puke', 'sleeping', 'smile'];

const dates = ['2019-12-31 23:59', '2 days ago', 'Today'];

const generateCommentDate = () => {
  const date = new Date();
  return dayjs(date).format('YYYY/MM/DD H:mm');
};

export const generateComment = () => {
  return {
    id: nanoid(),
    author: authors[getRandomInteger(0, authors.length - 1)],
    comment: commentTexts[getRandomInteger(0, commentTexts.length - 1)],
    date: generateCommentDate(),
    emotion: emoji[getRandomInteger(0, emoji.length - 1)],
  };
};
