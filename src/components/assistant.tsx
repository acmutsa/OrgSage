"use client";

import { useState } from "react";
import { Message, useAssistant } from 'ai/react';
import { ChatBubbleAvatar } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from './ui/chat/chat-input';
import { ChatMessageList } from './ui/chat/chat-message-list';
import { Send } from "lucide-react";

interface Chat {
  title: string;
  messages: Message[];
}

export default function Assistant() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/assistant'});

  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);

  const handleCreateNewChat = () => {
    const newChat: Chat = { title: `Chat ${chatHistory.length + 1}`, messages: [] };
    setChatHistory([...chatHistory, newChat]);
    setActiveChatIndex(chatHistory.length);
    console.log(chatHistory);
  };

  const handleChatSelect = (index: number) => {
    setActiveChatIndex(index);
    console.log(activeChatIndex);
  };

  const currentMessages = chatHistory[activeChatIndex]?.messages || messages;

  return (
    <div className="flex items-center max-w-full h-screen py-4 px-6 overflow-hidden bg-neutral-800">
      <div className="flex flex-col w-1/3 h-full p-4 overflow-y-scroll bg-neutral-900 text-white">
        <button onClick={handleCreateNewChat} className="mb-4 p-2 bg-emerald-500 rounded">
          New Chat
        </button>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            onClick={() => handleChatSelect(index)}
            className="p-2 mb-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
          >
            <strong>{chat.title}</strong>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full max-w-4xl h-full shadow-lg rounded-md overflow-hidden bg-neutral-700 ml-auto">
        <ChatMessageList className="flex-1 p-4 overflow-y-scroll">
          {currentMessages.map((m: Message) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 p-4 rounded-lg max-w-xl ${
                m.role === 'user'
                  ? 'bg-emerald-500 text-black self-end'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              {m.role !== 'user' && (
                <ChatBubbleAvatar
                  src="/OrgSageChatbotProfile.png"
                />
              )}
              <div>
                <div>{m.content}</div>
              </div>
            </div>
          ))}
        </ChatMessageList>

        <form onSubmit={submitMessage} className="flex items-center w-full p-4 bg-neutral-900 border-t border-gray-700">
          <ChatInput
            disabled={status !== 'awaiting_message'}
            value={input}
            placeholder="Ask a question..."
            onChange={handleInputChange}
            style={{ fontSize: '18px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitMessage();
              }
            }}
          />
          <button type="submit" className="ml-2 p-2 bg-emerald-400 rounded-full text-black hover:bg-emerald-500">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

