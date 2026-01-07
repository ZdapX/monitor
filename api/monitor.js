const nodemailer = require('nodemailer');
const axios = require('axios');

export default async function handler(req, res) {
    const URL_TARGET = "https://google.com"; // Ganti dengan website yang dipantau
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'braynofficial66@gmail.com',
            pass: 'yuqb nfuh duvg wxwu'
        }
    });

    try {
        const response = await axios.get(URL_TARGET, { timeout: 5000 });
        
        if (response.status !== 200) {
            throw new Error("Status code: " + response.status);
        }
        
        res.status(200).send("Website is UP");
    } catch (err) {
        // JIKA DOWN, KIRIM EMAIL
        await transporter.sendMail({
            from: '"System Monitor" <braynofficial66@gmail.com>',
            to: 'braynofficial66@gmail.com',
            subject: '⚠️ ALERT: Website Down!',
            html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <div style="border-left: 4px solid #ef4444; padding-left: 15px;">
                    <h2 style="color: #ef4444; margin: 0;">Website Down Terdeteksi</h2>
                    <p style="color: #4a5568;">Sistem mendeteksi bahwa website Anda tidak dapat diakses.</p>
                </div>
                <div style="margin-top: 20px; background: #fee2e2; padding: 15px; border-radius: 8px; color: #991b1b;">
                    <strong>Target:</strong> ${URL_TARGET}<br>
                    <strong>Waktu:</strong> ${new Date().toLocaleString()}
                </div>
            </div>`
        });
        
        res.status(500).send("Website is DOWN, Email Sent");
    }
}
