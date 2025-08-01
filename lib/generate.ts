import fs from "fs/promises";
import path from "path";

import { COMPONENTS } from "../lib/data";

const ROOT = process.cwd();
const outputPath = path.join(ROOT, "lib", "component-source.json");

async function safeRead(filePath: string) {
  try {
    const result = await fs.readFile(filePath, "utf8");
    return result.trim();
  } catch {
    return null;
  }
}

async function generate() {
  const output: Record<string, any> = {};

  for (const item of COMPONENTS) {
    const slug = item.slug.replace(/\s+/g, "");
    const isPrimitive = item.primitive !== false;

    const filePath = path.join(
      ROOT,
      isPrimitive ? "components/lab" : "components/ui",
      `${slug}.tsx`,
    );
    const code = await safeRead(filePath);

    const customHook = item.customHook
      ? await safeRead(path.join(ROOT, "hooks", `${item.customHook}.ts`))
      : null;

    const exampleCodes: Record<string, string | null> = {};

    for (const ex of item.example) {
      const examplePath = path.join(
        ROOT,
        "components/lab/examples",
        slug,
        `${ex.path}.tsx`,
      );
      exampleCodes[ex.path] = await safeRead(examplePath);
    }

    output[slug] = {
      name: item.name,
      code,
      customHook,
      exampleCodes,
      twConfig: item.twConfig || null,
      uiLibrary: item.uiLibrary || null,
      cssClass: item.cssClass || null,
    };
  }

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
  console.log(`✅ component-source.json generated to lib/`);
}

generate();
