import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Handlebars from 'handlebars';
import dotenv from 'dotenv';
dotenv.config();

export async function generateArticle(filePath) {
  // 1. Читаем raw файл
  const rawContent = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(rawContent);

  // 2. Подставляем контент (пока заглушка)
  const articleData = {
    title: data.title_hint,
    image: `assets/${data.id}.jpg`, // заглушка для картинки
    content: `<p>Автоматически сгенерированный текст для ${data.title_hint}.</p>`,
    sources: data.source_urls
  };

  // 3. Загружаем шаблон
  const templateSource = fs.readFileSync(path.resolve('templates/article.hbs'), 'utf8');
  const template = Handlebars.compile(templateSource);
  const html = template(articleData);

  // 4. Сохраняем HTML в public/
  const outputPath = path.resolve('public', `${data.id}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`Article generated: ${outputPath}`);

  // 5. Обновляем индекс
  updateIndex(data.id, data.title_hint);
}

function updateIndex(id, title) {
  const indexPath = path.resolve('public', 'index.html');
  let indexContent = '';
  if (fs.existsSync(indexPath)) {
    indexContent = fs.readFileSync(indexPath, 'utf8');
  } else {
    indexContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Indexmod Articles</title></head><body><h1>Articles</h1><ul></ul></body></html>`;
  }

  const listStart = indexContent.indexOf('<ul>');
  const listEnd = indexContent.indexOf('</ul>');
  const list = indexContent.slice(listStart + 4, listEnd);
  const newList = list + `<li><a href="${id}.html">${title}</a></li>`;
  const newIndex = indexContent.slice(0, listStart + 4) + newList + indexContent.slice(listEnd);
  fs.writeFileSync(indexPath, newIndex, 'utf8');
}
