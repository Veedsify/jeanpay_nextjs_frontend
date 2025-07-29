import { cookies } from "next/headers";

async function getServerToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Token not found");
  return token;
}

export default getServerToken;
