import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("role")
      .eq("email", user.email)
      .single()

    if (!adminUser) {
      return NextResponse.json({ error: "Not an admin" }, { status: 403 })
    }

    // Get active sessions in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

    const { data: sessions = [], error } = await supabase
      .from("page_views")
      .select("session_id")
      .gte("created_at", fiveMinutesAgo)
      .eq("is_active", true)

    if (error) {
      console.error("[v0] Error fetching realtime users:", error)
    }

    // Count unique sessions
    const uniqueSessions = new Set(sessions.map((s) => s.session_id)).size

    return NextResponse.json({
      activeUsers: uniqueSessions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Realtime analytics error:", error)
    return NextResponse.json({ activeUsers: 0, error: "Failed to fetch realtime data" }, { status: 500 })
  }
}
