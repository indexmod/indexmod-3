import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

export async function generateArticle(mdPath) {
  const name = path.basename(mdPath, ".md");

  // Читаем шаблон
  const templateStr = fs.readFileSync(path.resolve("./templates/article.hbs"), "utf-8");
  const template = Handlebars.compile(templateStr);

  // Генерируем текст с LLM
  const prompt = `Сделай статью по файлу ${name} в формате HTML с заголовком "${name}", фото и ссылками на источники.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const content = response.choices[0].message.content;

  // Генерируем HTML
  const html = template({ title: name, content });

  const outPath = path.resolve("./public", `${name}.html`);
  fs.writeFileSync(outPath, html);
  console.log("Article generated:", outPath);
}
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

export async function generateArticle(mdPath) {
  const name = path.basename(mdPath, ".md");

  // Читаем шаблон
  const templateStr = fs.readFileSync(path.resolve("./templates/article.hbs"), "utf-8");
  const template = Handlebars.compile(templateStr);

  // Генерируем текст с LLM
  const prompt = `Сделай статью по файлу ${name} в формате HTML с заголовком "${name}", фото и ссылками на источники.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const content = response.choices[0].message.content;

  // Генерируем HTML
  const html = template({ title: name, content });

  const outPath = path.resolve("./public", `${name}.html`);
  fs.writeFileSync(outPath, html);
  console.log("Article generated:", outPath);
}
