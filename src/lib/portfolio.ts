import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./types";

const DATA_PATH = path.join(process.cwd(), "src/data/portfolio.json");

export async function getPortfolio(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

export async function savePortfolio(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

