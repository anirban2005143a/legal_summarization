import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public', 'legal_judgments.json');
console.log(filePath)

// In-memory cache
let cachedData = null;
let lastFetched = null;
const cacheExpirationTime = 60000; // 60 seconds

// Function to fetch and cache data
const getData = () => {
    const currentTime = Date.now();

    // Check if cache is expired or doesn't exist
    if (!cachedData || currentTime - lastFetched > cacheExpirationTime) {
        console.log('Fetching fresh data...');

        // Read the file from disk if cache is expired or doesn't exist
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Cache the data
        cachedData = data;
        lastFetched = currentTime;
    } else {
        console.log('Using cached data...');
    }

    return cachedData;
};

export async function GET(request) {

    try {
        const url = new URL(request.url)
        const page = parseInt(url.searchParams.get("page") || "1", 10)
        const limit = parseInt(url.searchParams.get("limit") || "10", 10)

        //paging the data
        const data = getData();  // Use cached data or fetch it
        const start = (page - 1) * limit
        const end = Math.min(start + limit, data?.length)
        const paginatedData = data?.slice(start, end)

        return NextResponse.json(paginatedData || [])

    } catch (error) {
        console.log("error while fetching:", error)
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }

}