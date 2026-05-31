import { execSync, spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

function killPort(port) {
  if (process.platform === "win32") {
    try {
      const out = execSync(
        `netstat -ano | findstr :${port}`,
        { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] },
      );
      const pids = new Set(
        out
          .split(/\r?\n/)
          .map((line) => line.trim().split(/\s+/).pop())
          .filter((pid) => pid && /^\d+$/.test(pid)),
      );
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        } catch {
          /* already stopped */
        }
      }
    } catch {
      /* nothing listening */
    }
    return;
  }

  try {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
  } catch {
    /* nothing listening */
  }
}

killPort(3000);
try {
  rmSync(".next", { recursive: true, force: true });
} catch {
  /* ignore */
}

const child = spawn(process.execPath, [nextBin, "dev", "--webpack", "-p", "3000"], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
