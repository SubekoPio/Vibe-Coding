import { promises as fs } from "fs";
import path from "path";
import type { Testimonial } from "./types";

const PATH = path.join(process.cwd(), "src/data/testimonials.json");

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const raw = await fs.readFile(PATH, "utf-8");
    return JSON.parse(raw) as Testimonial[];
  } catch {
    return [];
  }
}

export async function saveTestimonials(items: Testimonial[]): Promise<void> {
  await fs.mkdir(path.dirname(PATH), { recursive: true });
  await fs.writeFile(PATH, JSON.stringify(items, null, 2), "utf-8");
}
