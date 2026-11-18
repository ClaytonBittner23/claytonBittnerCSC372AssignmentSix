import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;


export async function getTopics() {
    const result = await pool.query(
        'SELECT DISTINCT topic FROM questions ORDER BY topic'
    );

    return result.rows;
}

export async function getQuestionsByTopic(topic, limit, difficulty) {
    const result = await pool.query(
        `SELECT * FROM questions
         WHERE topic = $1
         AND ($2::text IS NULL OR difficulty = $2)
         ORDER BY id
         LIMIT $3`,
        [topic, difficulty || null, limit || null]
    );

    return result.rows;
}

export async function getRandomQuestion() {
    const result = await pool.query(
        'SELECT id, topic, question, difficulty FROM questions ORDER BY RANDOM() LIMIT 1'
    );

    return result.rows[0];
}

export async function checkAnswer(id, guess) {
    const result = await pool.query(
        'SELECT answer FROM questions WHERE id = $1',
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    const correct = result.rows[0].answer.trim().toLowerCase();
    const submitted = guess.trim().toLowerCase();

    return correct === submitted;
}

export async function addQuestion(topic, question, answer, difficulty) {
    const result = await pool.query(
        `INSERT INTO questions (topic, question, answer, difficulty)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [topic, question, answer, difficulty]
    );

    return result.rows[0];
}

