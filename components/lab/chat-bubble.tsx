"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

type chatProps = {
  id: number;
  user: string;
  message: string;
};

const chatItems: chatProps[] = [
  {
    id: 1,
    user: "me",
    message: "Good morning!",
  },
  {
    id: 2,
    user: "bot",
    message: "Wazzup bro?",
  },
  {
    id: 3,
    user: "me",
    message: "This is a cool chat bubble!",
  },
  {
    id: 4,
    user: "bot",
    message: "I know, right? 😎",
  },
];

const ChatBubble = () => {
  const [messages, setMessages] = useState<chatProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addMessage = () => {
    if (currentIndex < chatItems.length) {
      const newMessage = chatItems[currentIndex];
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, id: prevMessages.length + 1 },
      ]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setMessages([]);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="relative flex w-full flex-col justify-center gap-y-4 self-stretch">
      <div
        className={`absolute transition-all duration-300 ease-in-out ${
          messages.length > 0
            ? "bottom-0 right-0"
            : "bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
        }`}
      >
        <button
          onClick={addMessage}
          aria-label="Add message"
          className="inline-flex size-8 items-center justify-center rounded-full bg-secondary/80 p-1.5 text-secondary-foreground hover:bg-secondary"
        >
          <PiPlusBold className="h-full w-full" />
        </button>
      </div>
      <ul className="flex flex-col gap-y-4">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((message) => (
            <motion.li
              layout
              initial={{
                opacity: 0,
                scale: 0.8,
                transform:
                  message.user === "me" ? "rotate(-4deg)" : "rotate(4deg)",
              }}
              animate={{ opacity: 1, scale: 1, transform: "rotate(0)" }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: {
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.3,
                },
                transform: { duration: 0.2 },
              }}
              style={{
                originX: message.user === "me" ? 1 : 0,
              }}
              key={message.id}
              className={`flex w-full ${
                message.user === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex w-fit items-center gap-x-2 rounded-full px-3 py-2.5 ${
                  message.user === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <span className="text-sm font-medium leading-none">
                  {message.message}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ChatBubble;
