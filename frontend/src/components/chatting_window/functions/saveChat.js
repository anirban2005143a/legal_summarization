
"use client"
export const saveChatResponse = async (question, answer) => {

  try {
    const jsonallchat = localStorage.getItem("allChat")
    const allchats = jsonallchat ? JSON.parse(jsonallchat) : []
    
      allchats.push({
        question: question,
        answer: answer
      })
    localStorage.setItem("allChat", JSON.stringify(allchats))
    console.log(allchats)

    return { error: false }
  } catch (error) {
    console.error("Error:", error);
    return { error: true, message: error.message };
  }
}
