const getResponse = async(input)=>{
    
}
 const handelGetSummary = useCallback(
        async (e) => {
            setIsLoading(true)
            // setTimeout(() => {
            //     setOutput(`One Kumar Krishna Prasad Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal with costs. The`)
            //     setIsLoading(false)
            // }, 2000);
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_FAST_URL}/predict` , {
                    text: input
                },{
                    headers:{
                        "Content-Type": "application/json",
                    }
                })
                console.log(res)
                setOutput(res.data.output)
            } catch (error) {
                console.log(error)
                showToast(error.response?.data?.detail || error.message || "Unknown error. Please try again")
            }finally{
                setIsLoading(false)
            }
        },
        [],
    )