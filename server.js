import express from 'express';
import router from './router.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
//Makes all the endpoints start with /triviabook
app.use('/triviabook', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
