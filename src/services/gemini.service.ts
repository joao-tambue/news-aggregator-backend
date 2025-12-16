export async function generateRelatedContent(input: {
  title: string;
  description?: string;
}) {
  const prompt = `
Com base na notícia abaixo, escreva um parágrafo adicional
que dê mais contexto, impacto ou análise geral.
Não invente fatos, não mencione pessoas específicas
que não estejam no texto.

Título: ${input.title}
Descrição: ${input.description ?? ""}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao gerar conteúdo com Gemini");
  }

  const data = await response.json();

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    ""
  );
}