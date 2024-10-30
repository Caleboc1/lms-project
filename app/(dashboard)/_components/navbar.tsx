import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { SignInButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const Navbar = () => {
    const { userId} = auth(); // Check if user is signed in

    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm dark:bg-black">
            <MobileSidebar />
            <NavbarRoutes />
            {/* Show SignInButton only if user is not signed in */}
            {!userId && <SignInButton />}
        </div>
    );
};
