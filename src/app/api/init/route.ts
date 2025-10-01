import { initializeSiteConfig } from "@/lib/initialize-site-config"
import { NextResponse } from "next/server"

export async function GET() {
    await initializeSiteConfig()
    return NextResponse.json({ message: "Site config initialized" })
}