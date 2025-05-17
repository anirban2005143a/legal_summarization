import LegalCaseCard from "./LegalCaseCard";

const FetchData = async ({ page, data, setdata, allCasesRef, sethasMore, setisLoading }) => {

    try {
        setisLoading(true)
        const res = await fetch(`/api/data?page=${page}&limit=5`);
        const newData = await res.json();
        console.log(newData)

        // setisLoading(false)
        // newData?.forEach((legalCase) => {
        //     console.log(allCasesRef.current)
        //     allCasesRef.current.appendChild(<LegalCaseCard key={legalCase.id} legalCase={legalCase} />)
        // })

        if (newData.length > 0) {
            const prevData = data ? data : []
            setdata([...prevData, ...newData]);
        } else {
            sethasMore(false); // Stop infinite scroll when no more data is available
        }

    } catch (error) {
        // setisLoading(false)
        console.log(error)
        throw new Error("Some error occured. Please try again")
    }finally{
        setisLoading(false)
    }
}

export default FetchData