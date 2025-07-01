"use client"
export const saveChatResponse = async (question, answer) => {

  try {
    const jsonallchat = sessionStorage.getItem("allChat")
    const allchats = JSON.parse(jsonallchat) || []

    allchats.push({
      question: question,
      answer: answer
    })
    sessionStorage.setItem("allChat", JSON.stringify(allchats))
    console.log(allchats)

    return {
      error: false
    }
  } catch (error) {
    console.error("Error:", error);
    // throw new Error(error.response?.data?.message || error.message || "Unknown error. Please try again")
  }
}