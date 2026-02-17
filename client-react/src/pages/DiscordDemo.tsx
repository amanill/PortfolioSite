import WidgetBot from '@widgetbot/react-embed';
import React, { useState } from 'react';

const DiscordDemo: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    

    const onAPI = (api: WidgetBot['api']) => {
    api.on('message', ({ message, channel }) => {
  console.log(`New message in #${channel?.name}`, message)
    })
    }


    const handleSendNotification = async () => {
        setStatus('sending');
        setErrorMessage('');

        try {
            // The URL for the Cloudflare Worker will be placed here.
            // For local development, you might point to a local proxy or the deployed worker URL.
            const workerUrl = 'https://portfolio-discord-notification.amanill818.workers.dev'; // IMPORTANT: Replace with your actual worker URL

            if (workerUrl === 'YOUR_CLOUDFLARE_WORKER_URL') {
                throw new Error('Please replace "YOUR_CLOUDFLARE_WORKER_URL" in the code with your actual Cloudflare Worker URL.');
            }

            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Hello from the portfolio notification center!' }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to send notification: ${response.status} ${errorData}`);
            }

            setStatus('success');
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container">
            <div className="section">
                <h2>Discord Notification Demo</h2>
                <p>
                    This is a demonstration of sending a notification to a Discord channel using a serverless backend.
                </p>
                <p>
                    Clicking the button below will trigger a React component to call a Cloudflare Worker. The worker will then send a pre-defined message to a Discord channel via a webhook.
                </p>
                <button
                    className="btn waves-effect waves-light"
                    onClick={handleSendNotification}
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? 'Sending...' : 'Send Notification to Discord'}
                </button>

                {status === 'success' && (
                    <div className="card-panel green lighten-4 green-text text-darken-4" style={{ marginTop: '20px' }}>
                        Notification sent successfully! Check the Discord channel.
                    </div>
                )}
                {status === 'error' && (
                    <div className="card-panel red lighten-4 red-text text-darken-4" style={{ marginTop: '20px' }}>
                        <strong>Error:</strong> {errorMessage}
                    </div>
                )}
            </div>
            <div className="section">
                <h5>How it works:</h5>
                <ol>
                    <li>The React frontend calls a Cloudflare Worker endpoint when you click the button.</li>
                    <li>The Cloudflare Worker receives the request.</li>
                    <li>The worker sends a message to a Discord channel using a secure webhook URL (stored on the backend).</li>
                </ol>
            </div>
            <div className="section">
                <h5>Live Discord Channel View</h5>
                {/* <iframe
                    src="https://discord.com/widget?id=705171962556842024&theme=dark"
                    width="100%"
                    height="500"
                    allowTransparency="true"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                ></iframe> */}

                  <WidgetBot
    server="705171962556842024"
    channel="1473415483242975396"
    height={500}
    width={500}
    onAPI={onAPI}

  />
                
            </div>
        </div>
        

        
    );
};

export default DiscordDemo;
