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
  minioAccessKey: string;
  minioSecretKey: string;
  minioEndpoint: string;
  minioPort: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  minioAccessKey: process.env.MINIO_ROOT_USER!,
  minioSecretKey: process.env.MINIO_ROOT_PASSWORD!,
  minioEndpoint: process.env.MINIO_ENDPOINT!,
  minioPort: Number(process.env.MINIO_PORT),
};

export default config;
