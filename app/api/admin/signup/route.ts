import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SECRET_CODE = "Suvasti14Feb2k26";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, secretCode } = await req.json();

    if (secretCode !== SECRET_CODE) {
      return NextResponse.json({ error: "Invalid secret code" }, { status: 403 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
