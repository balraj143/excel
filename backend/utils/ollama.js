// // utils/ollama.js
// const axios = require("axios");

// async function generateSummaryWithOllama(data) {
//   const prompt = `Summarize the following Excel data in a few sentences:\n${JSON.stringify(data)}`;

//   try {
//     const res = await axios.post(
//       "http://localhost:11434/api/generate",
//       {
//         model: "llama3", // You can use 'llama3', 'mistral', etc.
//         prompt: prompt,
//         stream: false
//       }
//     );

//     return res.data.response.trim();
//   } catch (error) {
//     console.error("Ollama Summary Error:", error.message);
//     return "AI summary generation failed.";
//   }
// }

// module.exports = { generateSummaryWithOllama };
