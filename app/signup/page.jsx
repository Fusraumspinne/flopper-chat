import Form from "@/komponenten/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function signup() {
  const session = await getServerSession(authOptions)
  
  if(session) redirect("/dashboard")

  return (
    <div>
      <Form/>
    </div>
  );
}
