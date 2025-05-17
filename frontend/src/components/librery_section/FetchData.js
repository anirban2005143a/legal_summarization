
const FetchData = async ({ page, setdata, sethasMore, setisLoading }) => {

    try {
        setisLoading(true)
        const res = await fetch(`/api/data?page=${page}&limit=10`);
        const newData = await res.json();
        console.log(newData)

        if (newData.length > 0) {
            setdata((prevData) => [...prevData, ...newData]);
        } else {
            sethasMore(false); // Stop infinite scroll when no more data is available
        }

    } catch (error) {
        console.log(error)
        throw new Error("Some error occured. Please try again")
    } finally {
        setisLoading(false)
    }
}

export default FetchData