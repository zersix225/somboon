import type { UploadImageService } from "@/types/services/uploadImage";
import * as Creates from "@/services/uploadImage/creates";

export default function initUploadImageService(): UploadImageService {
  return {
    create: Creates.create(),
  };
}
