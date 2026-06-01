const fs = require("fs");
const path = require("path");

const nuxtrcPath = path.join(process.cwd(), ".nuxtrc");

if (!fs.existsSync(nuxtrcPath)) {
  process.exit(0);
}

const contents = fs.readFileSync(nuxtrcPath, "utf8");
const withoutWebVitals = contents
  .split("\n")
  .filter((line) => !line.includes("@nuxtjs/web-vitals"))
  .join("\n")
  .trim();

if (!withoutWebVitals) {
  fs.unlinkSync(nuxtrcPath);
} else {
  fs.writeFileSync(nuxtrcPath, `${withoutWebVitals}\n`);
}
