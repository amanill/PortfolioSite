export default {
    async fetch(request, env) {
        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return handleOptions(request);
        }

        if (request.method === 'POST') {
            return handlePost(request, env);
        }

        return new Response('Expected POST or OPTIONS', { status: 405 });
    },
};

async function handlePost(request, env) {
    const headers = {
        'Access-Control-Allow-Origin': '*', // Be more specific in production
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    try {
        const discordWebhookUrl = env.DISCORD_WEBHOOK_URL;
        if (!discordWebhookUrl || discordWebhookUrl === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
            throw new Error('Discord webhook URL is not configured in the worker environment.');
        }

        let body;
        try {
            body = await request.json();
        } catch (e) {
            body = { message: 'Default message: Hello from the portfolio notification center!' };
        }


        const discordRequest = {
            content: body.message || 'A notification was triggered from the portfolio website!',
        };

        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discordRequest),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Discord API error: ${response.status} ${errorText}`);
        }

        return new Response(JSON.stringify({ success: true }), { headers });
    } catch (error) {
        console.error(error.message);
        // Ensure headers are attached to error responses too for CORS
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
    }
}

function handleOptions(request) {
    // Standard CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*', // Adjust for production
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    return new Response(null, { headers });
}
