const axios = require('axios');

export default async function handler(req, res) {
    const URL_TARGET = "https://google.com"; // Harus sama dengan di monitor.js
    try {
        const start = Date.now();
        await axios.get(URL_TARGET, { timeout: 5000 });
        const latency = Date.now() - start;
        
        res.status(200).json({
            status: "UP",
            url: URL_TARGET,
            latency: latency + "ms",
            last_check: new Date().toLocaleTimeString()
        });
    } catch (err) {
        res.status(200).json({
            status: "DOWN",
            url: URL_TARGET,
            latency: "0ms",
            last_check: new Date().toLocaleTimeString()
        });
    }
}
