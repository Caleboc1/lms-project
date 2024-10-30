import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


const CoursesPage = async () => {
    const {userId} = auth();

    if (!userId) {
        return NextResponse.redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });  
    return (  
        <div className="p-6">
                <DataTable columns={columns} data={courses} />
        </div>
    );
}
 
export default CoursesPage;