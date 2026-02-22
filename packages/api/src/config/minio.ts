import * as Minio from "minio";
import config from "@/config/env";

const minioClient = new Minio.Client({
  endPoint: config.minioEndpoint,
  port: config.minioPort,
  accessKey: config.minioAccessKey,
  secretKey: config.minioSecretKey,
  useSSL: false,
});

export default minioClient;
