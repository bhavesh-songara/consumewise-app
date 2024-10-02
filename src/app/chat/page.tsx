"use client";

import ProductDialog from "@/components/ui/Chat/ProductDialog";
import { SearchProductTool } from "@/components/ui/Chat/SearchProductTool";
import { useChat } from "ai/react";
import Markdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>

              {m?.toolInvocations?.[0]?.toolName === "searchProduct" ? (
                <SearchProductTool toolInvocation={m.toolInvocations[0]} />
              ) : m.content.length > 0 ? (
                <Markdown>{m.content}</Markdown>
              ) : (
                <span className="italic font-light">
                  {"calling tool: " + m?.toolInvocations?.[0].toolName}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
