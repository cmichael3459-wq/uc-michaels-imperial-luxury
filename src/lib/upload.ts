import { createServerFn } from "@tanstack/react-start";
import { put } from "@vercel/blob";

const ADMIN_PASSWORD =
  (typeof process !== "undefined" && process.env.ADMIN_PASSWORD) || "ucadmin";

export const uploadImage = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    const password = data.get("password");
    if (password !== ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const file = data.get("file") as File | null;
    if (!file) {
      throw new Error("No file provided");
    }
    const blob = await put(`images/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return { url: blob.url };
  });
