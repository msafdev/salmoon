import fs from "fs";
import path from "path";
import { promisify } from "util";

import { ComponentType } from "@/lib/data";

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

export async function readFilePath(filePath: string): Promise<string> {
  const absolutePath = path.resolve(process.cwd(), filePath);

  try {
    // Check if file exists first
    await access(absolutePath, fs.constants.F_OK);
    const fileContent = await readFile(absolutePath, "utf8");
    return fileContent.trim();
  } catch (error) {
    throw new Error(`File not found or cannot be read: ${absolutePath}`);
  }
}

export async function getFilePathAndConfig(item: ComponentType) {
  const isPrimitive = item.primitive !== false;

  const filePath = isPrimitive
    ? path.join("components", "lab", `${item.slug.replace(/\s+/g, "")}.tsx`)
    : path.join("components", "ui", `${item.slug.replace(/\s+/g, "")}.tsx`);

  const code = isPrimitive
    ? await readFilePath(filePath).catch((error) => {
        console.error(`Component file error:`, error.message);
        return `// ${item.name} - [${filePath}] component not found\n// Error: ${error.message}`;
      })
    : "";

  const twConfig = JSON.stringify(item.twConfig, null, 2);
  const cssClass = item.cssClass;
  const uiLibrary = item.uiLibrary;

  let customHook: string | null = null;
  if (item.customHook) {
    const customHookPath = path.join("hooks", `${item.customHook}.ts`);
    customHook = await readFilePath(customHookPath).catch((error) => {
      console.error(`Custom hook error:`, error.message);
      return `// Custom hook "${item.customHook}" not found in /hooks\n// Error: ${error.message}`;
    });
  }

  const exampleCodes = await Promise.all(
    item.example.map(async (ex) => {
      if (!ex.path)
        return { name: ex.name, code: "// Example filePath missing" };

      const examplePath = path.join(
        "components",
        "lab",
        "examples",
        item.slug.replace(/\s+/g, ""),
        `${ex.path}.tsx`,
      );

      const exampleCode = await readFilePath(examplePath).catch((error) => {
        console.error(`Example file error:`, error.message);
        return `// ${ex.name} - [${examplePath}] example not found\n// Error: ${error.message}`;
      });

      return {
        name: ex.name,
        code: exampleCode,
      };
    }),
  );

  return { code, twConfig, uiLibrary, cssClass, exampleCodes, customHook };
}
