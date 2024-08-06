import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: ''  // Replace this with your OpenAI API key if  needed or changed
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.post('/get-response', async (req, res) => {
    const userInput = req.body.symptom;

    try {
        // Structured and detailed prompt
        const prompt = `Given the symptom description "${userInput}", please provide detailed responses to the following:
                    1. Identify the most likely disease associated with these symptoms.
                    2. Recommend which specialist the patient should consult.`;

        const completion = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-0125:umd:disease:9NWjerpx", // Ensure correct model identifier
            messages: [{ role: "system", content: prompt }],
            temperature: 0,
            max_tokens: 700, 
        });

        if (!completion.choices || completion.choices.length === 0) {
            throw new Error('Invalid response from the API.');
        }
        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error('Failed to fetch from OpenAI:', error);
        res.status(500).json({ error: 'Failed to process your request.', details: error.message });
    }
});




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

