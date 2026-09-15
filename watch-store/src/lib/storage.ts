import { promises as fs } from "fs";
import { join } from "path";

export interface StorageUpload {
  buffer: Buffer;
  filename: string;
  mimetype: string;
}

export interface StorageResult {
  url: string;
  publicId?: string;
}

export interface ImageStorage {
  upload(file: StorageUpload): Promise<StorageResult>;
  delete(url: string): Promise<void>;
}

class CloudinaryStorage implements ImageStorage {
  async upload(_file: StorageUpload): Promise<StorageResult> {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary is not configured");
    }
    // Architecture only — integrate with cloudinary SDK later
    throw new Error("Cloudinary integration is not active. Provide credentials or switch to LocalStorage.");
  }

  async delete(_url: string): Promise<void> {
    // no-op architecture stub
  }
}

class LocalStorage implements ImageStorage {
  private uploadDir: string;

  constructor() {
    this.uploadDir = join(process.cwd(), "public", "uploads");
  }

  async upload(file: StorageUpload): Promise<StorageResult> {
    const ext = file.filename.split(".").pop() ?? "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const fullDir = join(this.uploadDir, "watches");
    const dest = join(fullDir, safeName);
    await fs.mkdir(fullDir, { recursive: true });
    await fs.writeFile(dest, file.buffer);
    return { url: `/uploads/watches/${safeName}` };
  }

  async delete(url: string): Promise<void> {
    const rel = url.replace(/^\//, "");
    const file = join(process.cwd(), "public", rel);
    try {
      await fs.unlink(file);
    } catch {
      // ignore missing files
    }
  }
}

function detectStorage(): ImageStorage {
  const driver = process.env.IMAGE_STORAGE_DRIVER ?? "local";
  if (driver === "cloudinary") return new CloudinaryStorage();
  return new LocalStorage();
}

export const storage = detectStorage();
