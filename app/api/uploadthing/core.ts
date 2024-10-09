import { auth, getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error("Unauthorized");
        return { userId };
    } catch (error) {
        console.error("Authentication error:", error);
        throw new UploadThingError("Authentication failed");
    }
};


export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware((req) => handleAuth())
        .onUploadComplete(() => { }),

    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware((req) => handleAuth())
        .onUploadComplete(() => { }),

    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .middleware((req) => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
