const fs = require('fs').promises;
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const main = async (req, res) => {
  try {
    // Leer el archivo
    const filePath = './file/propuesta-iaCostos.pdf';
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const presentacion =  req.body.presentacion;
    const promptMessage = `se tiene una vacante para un puesto de desarrolldor web en el stack angular php segund esta presentacion ${presentacion} crees que cumple con el perfil`;
    
 

    const completion = await openai.chat.completions.create({
        model:"mistralai/mistral-large",
        messages: [{ role: "user", content: promptMessage }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: true,
    });

    let responseContent = "";
    for await (const chunk of completion) {
      responseContent += chunk.choices[0]?.delta?.content || "";
    }

    res.json({ response: responseContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = main;
