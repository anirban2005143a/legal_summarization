"use client"

export const getChatInfo = async (chatId) => {
    try {
        const jsonallchat = sessionStorage.getItem("allChat")
        const allchat = jsonallchat ? JSON.parse(jsonallchat) : []
        return (allchat || [])
    } catch (error) {
        console.error("Error:", error);
        return { error: true, message: error.response?.data?.message || error.message };
    }
}
