import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";



export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session);
  return (
    <div>
      <Button>Home</Button>
      {session? <p>{JSON.stringify(session)}</p> : <></>}
    </div>
  );
}
