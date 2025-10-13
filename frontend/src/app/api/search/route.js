import { NextResponse } from "next/server";

// Function to fetch and cache data
const fetchDocByQuery = async (formInput = "judgment" , pagenum=0) => {
    try {
        console.log(process.env.API_BASE_URL)
        const res = await fetch(`${process.env.API_BASE_URL}/search/?formInput=${formInput}&pagenum=${pagenum}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${process.env.API_KEY}`
            }
        })

        console.log(data)
        const data = await res.json()
        console.log(data)
        return data["docs"]
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function GET(request) {

    try {
        const url = new URL(request.url)
        const formInput = url.searchParams.get("formInput") 
        const pagenum = url.searchParams.get("pagenum") 
        const data = await fetchDocByQuery(formInput , pagenum)
        return NextResponse.json(data)

    } catch (error) {
        // console.log("error while fetching:", error)
        throw new Error(error.message)
    }

}