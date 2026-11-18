# claytonBittnerCSC372AssignmentSix
Clayton Bittner Sixth CSC372 Assignment


Database Schema:
    My database has a setup of the table having 5 values. First is the id, this is serial the done by postgress. The second value is topic of the question, such as science, math, history, ect ect. Third is the question itself, such as "what is the symbol for gold?". Fourth is the answer. And finally, the last value is the question difficulity, easy medium or hard. 

    It is worth noting, in the Seed data provided it almost seemed like there would be two tables, one with the topics that would then each have a subtable for their respective questions. Maybe I missed that in class but I did not know how to do that so I just put them all in one table and when I needed to pull up the topic types with a endpoint, I just had postgress return all the unique values for the topics.

Set Up Steps:
    Clone the repo to your machine, then run "npm install". To link it with your own database, create a .env file in your root and provide the database url. As long as your database you connect it to is also set up, start the server by using "node --watch --env-file=.env server.js" This will cause it to be hosting on your machine with the typical "http://localhost:300/triviabook"

Endpoints:
    There are five unique endpoints in this project. I will use the localhost:3000 in my example url

    1: List of unique question topics "http://localhost:3000/triviabook/topics"
        This GET endpoint responds with JSON containing all the unique question types in the database.

    2: List of questions in provided topic "http://localhost:3000/triviabook/topic/science"
        This GET endpoint responds with all the questions of the provided topic you entered. For the example above, it would list all the 
        science questions. There are optional params for the number of questions you want returned or the difficulity
    
    3: Random question "http://localhost:3000/triviabook/random"
        This endpoint is the last of the GET endpoints. It pulls a random question from the database and returns its values, 
        without the answer value. This is so you can get a random question from the database and answer with the next endpoint
    
    4: Checking a answer "http://localhost:3000/triviabook/answer"
        This POST endpoint needs the user to input a id and a answer. This then finds the question via the id, and then checks to see if the guess was correct by compairing to the answer. It is worth noting, there is no front end way to do this.

    5: Adding a new question "http://localhost:3000/triviabook/question/add"
        This is the last endpoint and another POST endpoint. This takes the user provided values for topic, question, answer, and difficuilty and if they are all valid, adds them to the database. Since the id value is serial, postgress does this automatically. Once again, there is no frontend way to do this.

    
Link to Render Deployment:

https://claytonbittnercsc372assignmentsix.onrender.com/triviabook/topics