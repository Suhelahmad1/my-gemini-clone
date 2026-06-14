import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  // ✅ LocalStorage se history load ho rhi hai
  const [prevPrompts, setPrevPrompts] = useState(() => {
    const saved = localStorage.getItem("gemini_prompts");
    return saved ? JSON.parse(saved) : [];
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // ✅ Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("gemini_theme");
    return savedTheme === "dark" || !savedTheme;
  });

  // Theme Sync effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("gemini_theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("gemini_theme", "light");
    }
  }, [darkMode]);

  // History sync effect
  useEffect(() => {
    localStorage.setItem("gemini_prompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Single Chat Delete Handler
  const deletePrompt = (e, targetItem) => {
    e.stopPropagation(); // Parent click ripple block karne ke liye
    setPrevPrompts((prev) => prev.filter((item) => item !== targetItem));
    if (recentPrompt === targetItem) {
      newChat();
    }
  };

  // Clear All Chats Handler
  const clearAllPrompts = () => {
    setPrevPrompts([]);
    newChat();
  };

  const onSent = async (prompt) => {
    let currentPrompt =
      prompt !== undefined && prompt !== null ? prompt : input;

    if (!currentPrompt || currentPrompt.trim() === "") return;

    // UI resets
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    // Sidebar entries tracker
    if (prompt === undefined) {
      setPrevPrompts((prev) => {
        if (!prev.includes(currentPrompt)) {
          return [...prev, currentPrompt];
        }
        return prev;
      });
    }

    setInput("");

    try {
      const response = await runChat(currentPrompt);
      // ✅ Ab typing animation library response ke sath smoothly resultData set karegi
      setResultData(response);
    } catch (error) {
      console.error("Error inside Context:", error);
      setResultData("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
    newChat,
    deletePrompt,
    clearAllPrompts,
    darkMode,
    setDarkMode,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
