import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";


// Decide which .env file to load:
// 1. If ENVIRONMENT is set, use `.env.<ENVIRONMENT>` (e.g. ENVIRONMENT=qa -> .env.qa)
// 2. Else prefer `.env.qa` if it exists in the repo root
// 3. Else fall back to default `.env`
const repoRoot = process.cwd();
const envFromVar = process.env.ENVIRONMENT;
const envQaPath = path.resolve(repoRoot, ".env.qa");
const defaultEnvFile = fs.existsSync(envQaPath) ? ".env.qa" : ".env";
const envFile = ".env.qa";   

dotenv.config({ path: path.resolve(repoRoot, envFile),
    override : true
 });
console.log("Loaded ENV FILE:", envFile);
console.log("USERNAME:", process.env.USERNAME);
function required(key: string): string {
  const v = process.env[key];
  if (!v)  throw new Error(`Missing required env var ${key}. Loaded file: ${envFile}`);
  return v;
}

export const env = {
  webUrl: required("WEB_URL"),
  apiUrl: required("API_URL"),
  username: required("USERNAME"),
  password: required("PASSWORD"),
  // helpful for debugging which file was loaded
  _loadedEnvFile: envFile,
};
