

export const fetchDocByQuery = async (query = "judgment" , pagenum=0 ) => {
    console.log(query)
    try {
        const res = await fetch(`api/search/?formInput=${query}&pagenum=${pagenum}`)
        const data = await res.json()
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}