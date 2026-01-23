import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `../../.env.${process.env.NODE_ENV ?? "development"}`,
  ),
  override: true,
});

interface Config {
  port: number;
  nodeEnv: string;
  isProduction: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
};

export default config;
