"use client"

export const getChatInfo = async (chatId) => {
    try {
        const jsonallchat = sessionStorage.getItem("allChat")
        const allchat = await JSON.parse(jsonallchat) || []
        return (allchat)
    } catch (error) {
        console.error("Error:", error);
        throw new Error(error.response?.data?.message || error.message || "Unknown error. Please try again") 
    }
}
