"use client"

export const getChatHistory = async () => {
  try {

    const jsonallchat = localStorage.getItem("allChat")
    const allchat = jsonallchat ? JSON.parse(jsonallchat) : {}
    console.log(allchat)
    const arr = []
    for (const key in allchat) {
      arr.push(allchat[key])
    }
    return { error: false, chat: arr||[] };

  } catch (error) {
    console.error("Error:", error);
    return { error: true, message: error.message };
  }
};
