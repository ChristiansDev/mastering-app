import { z } from "zod";

const fileSizeLimit = 250 * 1024 * 1024; // 250MB

// Audio Schema
export const AUDIO_SCHEMA = z.object({
    audio: z
        .any()
        .refine((file) => file !== undefined && file !== null, {
            message: "File is required",
        })
        .refine((file) => file instanceof File, {
            message: "Invalid file type",
        })
        .refine((file) =>
            file instanceof File &&
            ["audio/wav", "audio/mp3", "audio/mp4", "video/mp4"].includes(file.type),
            { message: "Invalid document file type" }
        )
        .refine((file) =>
            file instanceof File && file.size <= 250 * 1024 * 1024,
            { message: "File size should not exceed 250MB" }
        ),
    duration: z
        .number()
        .max(15 * 60, "Audio duration should not exceed 15 minutes"),
});