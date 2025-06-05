
"use client"
export const saveChatResponse = async (question, answer) => {

  try {
    const jsonallchat = sessionStorage.getItem("allChat")
    const allchats = jsonallchat ? JSON.parse(jsonallchat) : []
    
      allchats.push({
        question: question,
        answer: answer
      })
    sessionStorage.setItem("allChat", JSON.stringify(allchats))
    console.log(allchats)

    return { error: false }
  } catch (error) {
    console.error("Error:", error);
    return { error: true, message: error.message };
  }
}
