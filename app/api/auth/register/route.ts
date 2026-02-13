import { createClient } from "@/lib/supabase/server"
import { NextResponse, NextRequest } from "next/server"
import * as bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, displayName, role, password } = body

  // Validate inputs
  if (!email || !displayName || !role || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Only allow admin and super_admin registration
  if (!["admin", "super_admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  // Hash the password with bcrypt
  const passwordHash = await bcrypt.hash(password, 10)

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

  // Insert into admin_users with password hash
  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email,
      name: displayName,
      role,
      password_hash: passwordHash,
    })
    .select("id, email, name, role")
    .single()

  if (error) {
    console.error("[v0] Admin user insert error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, user: data })
}

