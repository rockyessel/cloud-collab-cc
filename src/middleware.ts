import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get a cookie
  const token = request.cookies.get("token")?.value;
  // console.log("request: ", request.nextUrl.pathname);
  // console.log("middleware token: ", token);

  const response = NextResponse.next();

  // Set a cookie
  response.cookies.set("pangae-token", `${token}`);

  // Setting a cookie with additional options
  response.cookies.set({
    name: "pangae-token",
    value: `${token}`,
    httpOnly: true,
  });

  return response;
}
