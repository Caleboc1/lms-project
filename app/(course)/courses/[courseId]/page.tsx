import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string;}
}) => {
    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
        },
        include:{
            chapters: {
                where:{
                    isPublished: true,
                },
                orderBy: {
                    positin: "asc"
                }
            }
        }
    });

    if (!course){
        return redirect("/");
    }
    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;