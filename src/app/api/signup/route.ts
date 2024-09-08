import { auth } from "@/auth/lucia";
import { NextResponse } from "next/server";
import * as context from "next/headers";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  
  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31
  ) {
    return NextResponse.json(
      { error: "Invalid username" },
      { status: 400 }
    );
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 400 }
    );
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username,
        password
      },
      attributes: {
        username
      }
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}