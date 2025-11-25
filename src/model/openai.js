import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function callModel(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }
  );

  let text = response.data.choices[0].message.content;

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Model did not return valid JSON");
  }
}
