import fs from "fs";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const baseDir = process.cwd();
    console.log("Base directory:", baseDir);

    const checkPaths = [
      "components",
      "components/lab",
      "components/lab/examples",
      "components/ui",
      "hooks",
    ];

    const results: Record<string, any> = {
      baseDir,
      paths: {},
    };

    for (const checkPath of checkPaths) {
      const fullPath = path.join(baseDir, checkPath);
      try {
        const exists = fs.existsSync(fullPath);
        if (exists) {
          const items = fs.readdirSync(fullPath);
          results.paths[checkPath] = {
            exists: true,
            items: items,
          };
        } else {
          results.paths[checkPath] = {
            exists: false,
            items: [],
          };
        }
      } catch (error) {
        results.paths[checkPath] = {
          exists: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
