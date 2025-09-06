
export const fetchDocById = async (docid = null) => {
    if (!docid) return [];

    try {
        const res = await fetch(`/api/doc/?docid=${docid}`)
        const data = await res.json()
        // console.log(data)
        return data
    } catch (error) {
        // console.log("error" , error)
        throw new Error(error)
    }
}