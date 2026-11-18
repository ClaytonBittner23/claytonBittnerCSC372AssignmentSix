//importing the functions from model.js
import { getTopics, getQuestionsByTopic, getRandomQuestion, checkAnswer, addQuestion } from './model.js';

//Calls the topics from the Neon project and lists alll the types of question topics
export async function getAllTopics(request, response) {
    try {
        //Calls for the list of topics in the table
        const topics = await getTopics();
        response.json(topics);
    }
    //If theres a error, spit this back
    catch (error) {
        response.status(500).json({ error: 'Failed to retrieve topics' });
    }
}

//When a topic is specficied, it will fetch all the questions that have that topic. 
export async function getTopicQuestions(request, response) {
    try {
        //Grabs the topic, which is required
        const { topic } = request.params;
        //Grabs the optional limit of how many to print and the difficulity level
        const { limit, difficulty } = request.query;

        //If the limit is below zero or invalid throw a error
        if (limit && (!Number.isInteger(Number(limit)) || Number(limit) <= 0)) {
            return response.status(400).json({ error: 'Invalid limit' });
        }

        //If the difficulty is invalid say so
        if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
            return response.status(400).json({ error: 'Invalid difficulty' });
        }

        //calls the getQuestionsByTopic with the params
        const questions = await getQuestionsByTopic(topic, limit, difficulty);

        //If theres no questions pulled up return that the topic isnt found
        if (questions.length === 0) {
            return response.status(404).json({ error: 'Topic not found' });
        }

        //Spit out the results
        response.json(questions);
    }  
    //Show this error if needed
    catch (error) {
        response.status(500).json({ error: 'Failed to retrieve questions' });
    }
}

//Gets a random question data
export async function getRandomTrivia(request, response) {
    try {
        //calls the function
        const question = await getRandomQuestion();

        //if theres no questions, say so
        if (!question) {
            return response.status(404).json({ error: 'No questions available' });
        }
        //return the question. This spits out everything besides the answer
        response.json(question);
    }
    //Spit this out if theres a error trying to get a random question
    catch (error) {
        response.status(500).json({ error: 'Failed to retrieve random question' });
    }
}

//Checks to see if your guess was correct. Does this by the user giving it the id of the question they want to answer and their guess
export async function checkTriviaAnswer(request, response) {
    try {
        //Grabbing the id and the guess from the JSON body
        const { id, guess } = request.body;

        //If theres no id, no guess, spit a json error saying so
        if (!id || guess === undefined || guess === null) {
            return response.status(400).json({ error: 'Missing required fields' });
        }

        //changes your id value to a integer, then checks to make sure its a valid number and that your guess is a string
        if (!Number.isInteger(Number(id)) || Number(id) <= 0 || typeof guess !== 'string') {
            return response.status(400).json({ error: 'Invalid parameters' });
        }

        //If the above all passes, this checks the guess you inputed with the questoin id
        const correct = await checkAnswer(id, guess);

        //If it fails when checking return the question wasnt found
        if (correct === null) {
            return response.status(404).json({ error: 'Question not found' });
        }

        //Otherwise, return that it is correct in the JSON
        response.json({ correct: correct });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to check answer' });
    }
}

//Adding a question, requires a topic, question, answer, and the diffculity. Trims and makes lowercase if needed to be uniform
export async function createTriviaQuestion(request, response) {
    try {
        //Grabs the values needed from the json inputted
        const { topic, question, answer, difficulty } = request.body;
        
        //If its missing anything, return a error that its missing
        if (!topic || !question || !answer || !difficulty) {
            return response.status(400).json({ error: 'Missing required fields' });
        }

        //If you did not set the difficulity to one of the 3, throw a error
        if (!['easy', 'medium', 'hard'].includes(difficulty.toLowerCase())) {
            return response.status(400).json({ error: 'Invalid difficulty' });
        }
        
        //If it makes it this far, trim all your inputs and set it to lowercase if needed to be uniform
        const newQuestion = await addQuestion(
            topic.trim(),
            question.trim(),
            answer.trim(),
            difficulty.toLowerCase()
        );

        //Adds the question
        response.status(201).json(newQuestion);
    }
    //Throws this error if there was one
    catch (error) {
        response.status(500).json({ error: 'Failed to add question' });
    }
}




