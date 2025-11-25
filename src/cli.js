#!/usr/bin/env node
import { generateArticle } from "./generator.js";
import path from "path";

const command = process.argv[2];
const file = process.argv[3];

if (command === "generate" && file) {
  const fullPath = path.resolve(process.cwd(), file);
  await generateArticle(fullPath);
} else {
  console.log("Usage: node src/cli.js generate raw/<file>.md");
}
