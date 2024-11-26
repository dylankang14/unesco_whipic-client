import { NextRequest, NextResponse } from "next/server";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
};

export async function middleware(request: NextRequest) {
  console.log("request:", request.url);
  // const allCookies = request.cookies.getAll();
  const authorization = request.cookies.get("Authorization");
  const accessToken = request.cookies.get("accessToken");
  console.log("Token value: ", authorization, accessToken, Boolean(authorization && accessToken));
  // if (authorization !== null && accessToken !== null) {
  // request.headers.set("Authorization", "process.env.TOKEN");
  // request.headers.set(
  //   "x-auth-token", "test"
  // );
  // }
  // const auth = request.headers.get("Authorization");
  // console.log("auth : ", JSON.stringify(auth));

  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-hello-from-middleware1", "hello");
  // requestHeaders.set("x-hello-from-middleware2", "world!");
  // request.headers.set("Accept", "application/json");

  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (authorization && accessToken) {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!exists) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon.svg|logo.svg|nextApi|api).*)"],
};
