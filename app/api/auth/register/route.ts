import { createClient } from "@/lib/supabase/server"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, displayName, role } = body

  // Only allow admin and super_admin registration
  if (!["admin", "super_admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  const supabase = await createClient()

  // Check if user exists in admin_users
  const { data: existing } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .single()

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  // Insert into admin_users
  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email,
      name: displayName,
      role,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, user: data })
}
