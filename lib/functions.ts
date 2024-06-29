import fs from "fs";
import path from "path";
import { promisify } from "util";

import { ComponentType } from "@/lib/data";

const readFile = promisify(fs.readFile);

export async function readFilePath(filePath: string): Promise<string> {
  const fileContent = await readFile(
    path.join(process.cwd(), filePath),
    "utf8",
  );
  return fileContent.trim();
}

export async function getFilePathAndConfig(item: ComponentType) {
  const filePath = `./components/lab/${item.slug.replace(/\s+/g, "")}.tsx`;

  const code = await readFilePath(filePath).catch(() => {
    return `// ${item.name} component not found`;
  });

  const twConfig = JSON.stringify(item.twConfig, null, 2);

  return { code, twConfig };
}
