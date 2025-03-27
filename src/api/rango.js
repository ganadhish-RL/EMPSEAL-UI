// src/api/rango.js
export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { action, payload } = req.body; // Get the action and payload from the request
  
            let apiUrl;
            switch (action) {
                case 'confirm':
                    apiUrl = "https://api.rango.exchange/routing/confirm";
                    break;
                case 'createTx':
                    apiUrl = "https://api.rango.exchange/tx/create";
                    break;
                case 'checkStatus':
                    apiUrl = "https://api.rango.exchange/tx/check-status";
                    break;
                case 'bests':
                    apiUrl = "https://api.rango.exchange/routing/bests";
                    break;
                default:
                    return res.status(400).json({ error: "Invalid action" });
            }
  
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'apiKey': process.env.RANGO_API_KEY,
                },
                body: JSON.stringify(payload),
            });
  
            if (!response.ok) {
                return res.status(response.status).json({ error: "API request failed" });
            }
  
            const data = await response.json();
            return res.status(200).json(data);
        } else {
            return res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
  }
    