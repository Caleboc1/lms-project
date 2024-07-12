
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
<div className="hidden md:block ">
  <UserButton 
  afterSignOutUrl="/"
  />
</div>
  );
}
