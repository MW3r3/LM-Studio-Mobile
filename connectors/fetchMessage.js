import axios from 'axios';

async function fetchMessage(messages, temperature, max_tokens, stream) {
    try {
        const response = await axios.post('http://localhost:1234/v1/chat/completions', {
            messages: messages,
            temperature: temperature,
            max_tokens: max_tokens,
            stream: stream
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (logging) {
            console.log('Response from fetchMessage');
            console.log(response.data);
        }
        return response.data;

    } catch (error) {
        console.error(error);
        return error;
    }
}

export default fetchMessage;