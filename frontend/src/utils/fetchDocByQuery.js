

export const fetchDocByQuery = async (query = "judgment" ) => {
    try {
        const res = await fetch(`api/search/?query=${query}`)
        const data = await res.json()
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}