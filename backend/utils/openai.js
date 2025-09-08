// const { OpenAI } = require("openai");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// async function generateSummaryWithOpenAI(data) {
//   const prompt = `Summarize this Excel data in 2-3 sentences:\n\n${JSON.stringify(data.slice(0, 10))}`;

//   const chat = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.5,
//   });

//   return chat.choices[0]?.message?.content || "No summary generated.";
// }

// module.exports = { generateSummaryWithOpenAI };
