const axios = require('axios');
const API_KEYS = ['905fbd1157074a2c86a58fbdcdb8c141', '10c1c29c1b614199854f49c6c0949410', '21f34604471542769ec3b90d00b8ed04', '601ed272b0924e46a235cf23074687a4', '645c53198a534f7faad8624a04f21455', '9afza5vpuemopj82ffu65gt9sh9v8n9s','cc9b050a6a4c48a5afbfff8487f183d6','dc3a9e5ef89048a895b68d681fc0cf17'];
const baseUrl = 'https://www.cutout.pro/api';

function getRandomApiKey() {
    const index = Math.floor(Math.random() * API_KEYS.length);
    return API_KEYS[index];
}


async function sendTask(prompt, style, imageUrl, width, height) {
    try {
        const apiKey = getRandomApiKey();
        const response = await axios.post(`${baseUrl}/v1/text2imageAsync`, {
            prompt,
            style,
            imageUrl,
            width,
            height
        }, {
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending task:', error);
        return null;
    }
}


async function getTaskResult(taskId) {
    try {
        const apiKey = getRandomApiKey();
        const response = await axios.get(`${baseUrl}/v1/getText2imageResult`, {
            headers: {
                'APIKEY': apiKey
            },
            params: {
                taskId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching task result:', error);
        return null;
    }
}


async function performTasks() {
    const prompt = prompt;
    const style =  style; 
    const imageUrl = null; // أو URL لصورة إذا كانت مطلوبة
    const width = 512;
    const height = 512;

    const taskResponse = await sendTask(prompt, style, imageUrl, width, height);
    if (taskResponse && taskResponse.code === 0) {
        const taskId = taskResponse.data;
        console.log('Task sent successfully. Task ID:', taskId);

         
        setTimeout(async () => {
            const resultResponse = await getTaskResult(taskId);
            if (resultResponse && resultResponse.code === 0) {
                console.log('Task result:', resultResponse.data);
            }
        }, 10000); 
    }
}

performTasks();
