/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Message, useAssistant } from 'ai/react';

export default function Assistant() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/assistant' });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto space-y-4">
      {messages.map((m: Message) => (
        <div
          key={m.id}
          className={`p-4 rounded-lg max-w-xs ${
            m.role === 'user'
              ? 'bg-green-400 text-black self-end'
              : 'bg-gray-200 text-black self-start'
          }`}
        >
          <strong>{`${m.role === 'user' ? 'You' : 'Assistant'}: `}</strong>
          {m.content}
        </div>
      ))}

      <form onSubmit={submitMessage} className="fixed bottom-0 w-full max-w-md p-2 mb-8">
        <input
          className="w-full p-2 border border-gray-300 rounded shadow-xl"
          disabled={status !== 'awaiting_message'}
          value={input}
          placeholder="Ask a question..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
