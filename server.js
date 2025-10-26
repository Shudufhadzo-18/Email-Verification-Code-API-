import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Resend API
const resend = new Resend("re_hzGmnCfx_6zCfpA2pbkfsdsYXUNmZqtpf"); // <-- replace with your Resend API key

app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000); // 4-digit code
  console.log(` Sending code ${code} to ${email}`);

  try {
    // Send the email using Resend API
    await resend.emails.send({
      from: "Employee Verification <no-reply@resend.dev>", // you can customize this
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
    });

    console.log(` Email sent successfully to ${email}`);
    res.json({ success: true, code });
  } catch (error) {
    console.error(" Failed to send email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));