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
  const isPrimitive = item.primitive !== false;

  const filePath = isPrimitive
    ? `./components/lab/${item.slug.replace(/\s+/g, "")}.tsx`
    : `./components/ui/${item.slug.replace(/\s+/g, "")}.tsx`;

  const code = isPrimitive
    ? await readFilePath(filePath).catch(() => {
        return `// ${item.name} - [${filePath}] component not found`;
      })
    : "";

  const twConfig = JSON.stringify(item.twConfig, null, 2);
  const cssClass = item.cssClass;
  const uiLibrary = item.uiLibrary;

  let customHook: string | null = null;
  if (item.customHook) {
    const customHookPath = `./hooks/${item.customHook}.ts`;

    customHook = await readFilePath(customHookPath).catch(() => {
      return `// Custom hook "${item.customHook}" not found in /hooks`;
    });
  }

  const exampleCodes = await Promise.all(
    item.example.map(async (ex) => {
      if (!ex.path)
        return { name: ex.name, code: "// Example filePath missing" };

      const examplePath = `./components/lab/examples/${item.slug.replace(/\s+/g, "")}/${ex.path}.tsx`;

      const exampleCode = await readFilePath(examplePath).catch(() => {
        return `// ${ex.name} - [${examplePath}] example not found`;
      });

      return {
        name: ex.name,
        code: exampleCode,
      };
    }),
  );

  return { code, twConfig, uiLibrary, cssClass, exampleCodes, customHook };
}
