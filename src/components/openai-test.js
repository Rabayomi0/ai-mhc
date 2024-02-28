import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Tell me a joke" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
