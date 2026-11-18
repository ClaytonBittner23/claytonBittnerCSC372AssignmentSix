import express from 'express';
//importing the values from controller.js
import { getAllTopics, getTopicQuestions, getRandomTrivia, checkTriviaAnswer, createTriviaQuestion} from './controller.js';

const router = express.Router();

//router endpoint for getting all topics
//Local host example link below
//http://localhost:3000/triviabook/topics
router.get('/topics', getAllTopics);

//Router endpoint for getting a topics questions, can have optional params
//http://localhost:3000/triviabook/topic/science
router.get('/topic/:topic', getTopicQuestions);

//Router endpoint for getting a random question
//http://localhost:3000/triviabook/random
router.get('/random', getRandomTrivia);

//Router endpoint for posting a answer (used EchoAPI to test this one cant open a in a browser)
//http://localhost:3000/triviabook/answer
router.post('/answer', checkTriviaAnswer);

//Router endpoint for posting a new question to the database (Again, used EchoAPI to test, there is no frontend way to do this setup)
//http://localhost:3000/triviabook/question/add
router.post('/question/add', createTriviaQuestion);

export default router;
