import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = auth();
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });
    
        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        // Fetch `MuxData` with its associated `Chapter`
        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: params.chapterId,
            },
            include: {
                chapter: {
                    select: {
                        title: true,
                        description: true,
                        videoUrl: true
                    }
                }
            }
        });
    
        // Validate the presence of required fields
        if (!muxData || !muxData.chapter?.title || !muxData.chapter?.description || !muxData.chapter?.videoUrl) {
            return new NextResponse("Missing required fields", { status: 400 });
        }
    
        const publishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedChapter);
    } catch (error) {
        console.error("[CHAPTER_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
    
}