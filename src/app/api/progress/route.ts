// API Route: Save User Progress
import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, moduleId, progress, score, completedAt, lessonIds } = body;

    if (!userId || !moduleId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure supabase client is configured
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    // Check if user is authenticated
    const client = supabase as any;
    const { data: { session } } = await client.auth.getSession();
    if (!session || session.user.id !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Save or update progress
    const { data, error } = await client
      .from("user_progress")
      .upsert(
        {
          user_id: userId,
          module_id: moduleId,
          progress_percentage: progress,
          final_score: score,
          completed_at: completedAt,
          completed_lessons: lessonIds || [],
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,module_id",
        }
      )
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save progress" },
        { status: 500 }
      );
    }

    // Broadcast update to other clients (if realtime configured)
    if (client.channel) {
      try {
        await client
          .channel(`user-${userId}-progress`)
          .send({
            type: "broadcast",
            event: "progress_update",
            payload: { moduleId, progress },
          });
      } catch (e) {
        // ignore realtime send errors during build or when not configured
        console.warn("Realtime send skipped:", e);
      }
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: "Progreso guardado exitosamente",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }
    const client = supabase as any;

    // Fetch user progress
    const { data, error } = await client
      .from("user_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch progress" },
        { status: 500 }
      );
    }

    const items = (data || []) as any[];
    const total = items.reduce((sum: number, item: any) => sum + (item.progress_percentage || 0), 0);
    const totalProgress = total / (items.length || 1);

    return NextResponse.json({
      success: true,
      data: items,
      totalProgress,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
