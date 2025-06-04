
const today = new Date();

// Get the date two years ago
const startDate = new Date();
startDate.setFullYear(today.getFullYear() - 10);

// Helper function to format date as DD-MM-YYYY
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


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