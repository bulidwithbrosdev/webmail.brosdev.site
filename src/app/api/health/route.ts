import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare";
import { getDb } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
	const env = getEnv();
	let databaseStatus = "unknown";

	try {
		const db = getDb(env);
		await db.run(sql`SELECT 1`);
		databaseStatus = "connected";
	} catch (error) {
		databaseStatus = error instanceof Error ? error.message : "error";
		return NextResponse.json(
			{
				status: "degraded",
				app: "Brosdev Mail",
				database: databaseStatus,
				timestamp: new Date().toISOString(),
			},
			{ status: 503 }
		);
	}

	return NextResponse.json(
		{
			status: "healthy",
			app: "Brosdev Mail",
			database: databaseStatus,
			timestamp: new Date().toISOString(),
		},
		{
			status: 200,
			headers: {
				"Cache-Control": "no-store, max-age=0",
			},
		}
	);
}

