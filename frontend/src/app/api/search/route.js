import { NextResponse } from "next/server";

// Function to fetch and cache data
const fetchDocByQuery = async (query = "judgment") => {
    try {
        console.log(process.env.API_BASE_URL)
        const res = await fetch(`${process.env.API_BASE_URL}/search/?formInput=${query}&maxpages=2`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${process.env.API_KEY}`
            }
        })
        const data = await res.json()
        // console.log(data)
        return data["docs"]
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function GET(request) {

    try {
        const url = new URL(request.url)
        const query = url.searchParams.get("query") 
        const data = await fetchDocByQuery(query)
        return NextResponse.json(data)

    } catch (error) {
        console.log("error while fetching:", error)
        throw new Error(error.message)
    }

}