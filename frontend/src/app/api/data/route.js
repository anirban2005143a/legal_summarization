import { NextResponse } from "next/server";
import data from "../../../../large.json"

export async function GET(request) {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get("page") || "1", 10)
    const limit = parseInt(url.searchParams.get("limit") || "10", 10)

    //paging the data
    const start = (page - 1) * limit
    const end = Math.min(start + limit , data?.length)
    const paginatedData = data?.slice(start , end)

    return NextResponse.json(paginatedData || [])
}