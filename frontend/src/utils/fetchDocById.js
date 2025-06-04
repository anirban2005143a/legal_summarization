
export const fetchDocById = async (docid = null) => {
    if (!docid) return [];

    const res = await fetch(`/api/doc/?docid=${docid}`)
    const data = await res.json()
    console.log(data)
    return data
}