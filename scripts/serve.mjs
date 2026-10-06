import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".md": "text/plain" };
createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const path = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
    const relative = path.slice(root.length).split(/[\\/]/);
    if (!path.startsWith(root) || relative.some((part) => part.startsWith(".")) || !types[extname(path)] || (path !== root && !path.startsWith(root.endsWith(sep) ? root : root + sep))) { response.writeHead(404).end(); return; }
    const data = await readFile(path);
    response.writeHead(200, { "Content-Type": `${types[extname(path)]}; charset=utf-8`, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" || error.code === "EISDIR" ? 404 : 400).end();
  }
}).listen(port, "127.0.0.1", () => console.log(`Security+ practice: http://127.0.0.1:${port}`));
