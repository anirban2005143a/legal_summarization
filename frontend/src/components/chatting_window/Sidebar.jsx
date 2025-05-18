"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import { getChatHistory } from './functions/getChatHistory';
import { DocumentLoader } from '../Loader/DocumentLoader';
import { showToast } from './functions/ShowToast';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isNavOpen, setchatCount, setisChatInfoFetching, setSelectedChatId, selectedChatId, width = width }) => {
  const [allChats, setallChats] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isReady, setisReady] = useState(false);
  const [isChatDeleting, setisChatDeleting] = useState(false)

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Set initial selected chat (most recent one)
  useEffect(() => {
    if (allChats && allChats.length > 0 && !selectedChatId) {
      setSelectedChatId(allChats[0].chatId);
      localStorage.setItem("chatTitle", allChats[0].title);
      router.push(`/chat/${allChats[0].chatId || 123}`);
    }
    allChats && setchatCount(allChats.length)
  }, [allChats, selectedChatId]);

  // Focus input when adding new chat
  useEffect(() => {
    if (isAddingNew && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingNew]);

  const handleAddClick = () => {
    setIsAddingNew(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const name = inputValue.trim();
      saveChat(name);
    }
  };

  const saveChat = async (name) => {
    try {
      setisChatInfoFetching(true)
      if (!name) {
        showToast("Chat name cannot be empty", 1);
        setisChatInfoFetching(false)
        return;
      }

      if (name !== "New chat" && allChats && allChats.some(chat => (chat.title)||"Unknown".toLowerCase() === name.toLowerCase())) {
        showToast("A chat with this name already exists", 1);
        setisChatInfoFetching(false)
        return;
      }

      const newChat = {
        title: name,
        chatId: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      allChats ? setallChats((prev) => [newChat, ...prev]) : setallChats([newChat]);
      setSelectedChatId(newChat.chatId);
      localStorage.setItem("chatTitle", newChat.title);
      router.push(`/chat/${newChat.chatId}`);

      //set states to default
      setIsAddingNew(false);
      setInputValue("");
      showToast("Chat created successfully", 0);
    } catch (error) {
      console.log(error)
      showToast(error.response?.data?.message || error.message, 1);
    }
  };

  const handleDeleteChat = async (id) => {
    if (!id) {
      alert("Chat ID is required to delete a chat");
      return;
    }
    try {
      const allchatFromLocalStorage = localStorage.getItem("allChat").json() 
      delete allchatFromLocalStorage[`${id}`]
      localStorage.setItem("allChat" , JSON.stringify(allchatFromLocalStorage))
      handelDeletechatFromArray(id);
    } catch (error) {
      showToast(error.response?.data?.message || error.message, 1);
    }
  };

  const handleChatClick = (chatId, chatList, title) => {
    setSelectedChatId(chatId);
    setisChatInfoFetching(true)
    // setselectedChat(chatList || []);
    localStorage.setItem("chatTitle", title);
  };

  let sortedChats = []
  allChats ? sortedChats = [...allChats].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ) : ""

  const ChatHistory = async () => {
    try {
      setisReady(false);
      const data = await getChatHistory();
      console.log(data)

      if (!data.error) {
        if (data.chat.length > 0) {
          setSelectedChatId(data.chat[data.chat.length - 1].chatId);
          if (data.chat.length > 0)
            // setselectedChat(data.chat[data.chat.length - 1].chatList);

            setallChats(data.chat || []);
          if (data.chat.length === 0) saveChat("New chat");
        } else {
          showToast(data.message, 1);
        }
      }
    } catch (error) {
      showToast(error.response?.data?.message || error.message, 1);
    } finally {
      setisReady(true);
    }
  };

 
  const handelDeletechatFromArray = (id) => {
    const arr = allChats
    const newArr = arr.filter((chat) => chat.chatId != id)
    newArr.length === 0 ? setSelectedChatId(null) : setSelectedChatId(newArr[0].chatId)
    setallChats((prev) => prev.filter((chat) => chat.chatId != id));
  };

  useEffect(() => {
    if (selectedChatId) {
      router.push(`/chat/${selectedChatId}`);
    }
  }, [selectedChatId]);

  useEffect(() => {
    ChatHistory();
  }, []);

  // console.log(allChats)
  return (
    <>
      <ToastContainer />
      {!isReady && <DocumentLoader />}
      {isReady && (
        <div
          id="sidebar"
          className={`
            z-10
            fixed sm:relative h-full bg-slate-900 overflow-x-hidden rounded-tr-2xl
            transition-all duration-300 ease-in-out
            ${isNavOpen ? "left-0" : "-left-full sm:left-0"}
          `}
          style={{
            width: width >= 640 ? (isNavOpen ? "400px" : "0%") : "80%",
          }}
        >
          <div
            className={`
              p-4 flex flex-col overflow-x-hidden overflow-y-auto h-full
              transition-opacity duration-300
              ${isNavOpen ? "opacity-100" : "opacity-0 sm:opacity-100"}
            `}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-md font-semibold text-white">Your chat</h2>
              <button
                onClick={handleAddClick}
                disabled={isAddingNew}
                className={`px-2 py-1.5 bg-slate-800 text-white rounded hover:bg-slate-800/80 cursor-pointer ${isAddingNew ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="my-4 h-full overflow-y-auto">
              <ul className="space-y-2 text-white">
                {isAddingNew && (
                  <li className="p-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      placeholder="Enter chat name"
                      className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                    />
                  </li>
                )}
                {sortedChats.map((chat, ind) => (
                  <li
                    key={ind}
                    className={`group cursor-pointer flex overflow-hidden items-center justify-between p-1 rounded hover:bg-gray-800 ${selectedChatId === chat.chatId ? "bg-gray-700" : ""
                      }`}
                    onClick={() =>
                      handleChatClick(chat.chatId, chat.chatList, chat.title)
                    }
                  >
                    <span
                      className={`flex-1 truncate px-2 py-1 ${selectedChatId === chat.chatId ? "font-medium" : ""
                        }`}
                    >
                      {chat.title || "Unknown"}
                    </span>
                    <div className="relative" ref={dropdownRef}>
                      {!isChatDeleting && <button
                        className="p-1 text-red-500  opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={(e) => {
                          handleDeleteChat(chat.chatId);
                          e.stopPropagation();
                        }}
                      >
                        <Trash size={16} />
                      </button>}
                      {isChatDeleting && <Loader2 className=' animate-spin' />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;