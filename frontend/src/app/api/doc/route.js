import { NextResponse } from "next/server";

// Function to fetch and cache data
export const fetchDocById = async (docid = null) => {
    if (!docid) return [];

    const res = await fetch(`${process.env.API_BASE_URL}/doc/${docid}`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${process.env.API_KEY}`
        }
    })
    const data = await res.json()
    // console.log(data)
    return data
}

export async function GET(request) {

    try {
        const url = new URL(request.url)
        const docid = url.searchParams.get("docid")
        const data = await fetchDocByQuery(docid)
        return NextResponse.json(data)

    } catch (error) {
        console.log("error while fetching:", error)
        throw new Error(error.message)
    }

}