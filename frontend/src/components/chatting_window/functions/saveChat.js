
"use client"
export const saveChatResponse = async (question, answer, uniqueId, userId, title) => {

  try {
    const jsonallchat = localStorage.getItem("allChat")
    const allchats = jsonallchat ? JSON.parse(jsonallchat) : {}
    const prevChat = allchats[`${uniqueId}`]
    if (!prevChat) {
      const newChat = {
        title : title,
        createdAt : Date.now(),
        chatList : [
          {question , answer}
        ],
        chatId : uniqueId
      }
      allchats[`${uniqueId}`] = newChat
    } else {
      prevChat.chatList.push({
        question: question,
        answer: answer
      })
      allchats[`${uniqueId}`] = prevChat
    }
    localStorage.setItem("allChat", JSON.stringify(allchats))
    console.log(allchats)

    return { error: false }
  } catch (error) {
    console.error("Error:", error);
    return { error: true, message: error.message };
  }
}
