"use client"

export const getChatInfo = async (chatId) => {
    try {
        const jsonallchat = localStorage.getItem("allChat")
        const allchat = jsonallchat ? JSON.parse(jsonallchat) : {}
        const chatHistory = allchat[`${chatId}`]
        return (chatHistory?.chatList || [])
    } catch (error) {
        console.error("Error:", error);
        return { error: true, message: error.response?.data?.message || error.message };
    }
}
