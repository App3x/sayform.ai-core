import { NextResponse } from "next/server";
import { db } from "@/db";
import { forms, questions } from "@/db/schema";

export async function POST(request: Request) {
  const { title, questions: formQuestions } = await request.json();

  if (!title || !formQuestions || !Array.isArray(formQuestions)) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  try {
    const [formId] = await db.insert(forms).values({
      id: crypto.randomUUID(),
      title,
      userId: request.headers.get('user-id'), // Assuming userId is set in headers by middleware
    }).returning({ insertedId: forms.id });

    await db.insert(questions).values(
      formQuestions.map((q: any) => ({
        id: crypto.randomUUID(),
        formId: formId.insertedId,
        type: q.type,
        question: q.question,
        options: q.options ? JSON.stringify(q.options) : null,
      }))
    );

    return NextResponse.json({ success: true, formId: formId.insertedId });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json({ error: "Failed to create form" }, { status: 500 });
  }
}