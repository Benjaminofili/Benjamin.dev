"use client";

/**
 * AgentChat — Agentic AI Assistant
 * Anthology Developer Portfolio · 2026
 *
 * Stack:   Next.js 15 App Router · React 19 · Tailwind CSS · Shadcn UI
 *          Vercel AI SDK (@ai-sdk/react)
 * Theme:   Quiet Minimalism · Dark-mode native · Glassmorphism overlay
 * Mount:   src/app/layout.tsx → <AgentChat /> inside <body>, after page content
 *
 * Design tokens — identical to all Anthology chapters:
 *   Surface     bg-neutral-950 / bg-neutral-900 (glass layer)
 *   Border      neutral-800 → emerald-900 accent
 *   Accent      emerald-500 / emerald-400
 *   Display     Instrument Serif
 *   Meta        DM Mono
 *   Edges       rounded-none (sharp)
 *
 * Dependencies:
 *   npm install @ai-sdk/react
 *   npx shadcn@latest add card button input scroll-area avatar badge
 */

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

/* ─── Icons (inline SVG — zero extra dependencies) ──────────────────────── */

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

/* ─── Typing indicator ───────────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-neutral-500"
          style={{
            animation: "ac-typing-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Suggested prompts ──────────────────────────────────────────────────── */

const SUGGESTED_PROMPTS = [
  "What is his experience with Next.js?",
  "Describe his approach to RAG pipelines.",
  "What are his strongest engineering skills?",
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: () => setHasInteracted(true),
  });
  const isLoading = status === "submitted" || status === "streaming";

  /* Auto-scroll to newest token ─────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Handle suggested prompt click ───────────────────────────────────── */
  function handleSuggestedPrompt(prompt: string) {
    setInput("");
    setHasInteracted(true);
    void sendMessage({ text: prompt });
  }

  function getMessageText(message: UIMessage): string {
    return message.parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          part.type === "text" && typeof (part as { text?: unknown }).text === "string",
      )
      .map((part) => part.text)
      .join("\n");
  }

  /* Handle keyboard submit ──────────────────────────────────────────── */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey && !isLoading && input.trim()) {
      e.preventDefault();
      void sendMessage({ text: input.trim() });
      setInput("");
    }
  }

  return (
    <>
      {/* ── Scoped styles ──────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .ac-font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .ac-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }

        /* Chat window enter animation */
        @keyframes ac-window-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .ac-window-enter {
          animation: ac-window-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* FAB glow */
        .ac-fab {
          transition: box-shadow 0.2s ease, background-color 0.2s ease;
        }
        .ac-fab:hover {
          box-shadow: 0 0 28px rgba(52, 211, 153, 0.3);
          background-color: rgb(52, 211, 153);
        }
        .ac-fab:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.6);
        }

        /* FAB open state */
        .ac-fab-open {
          background-color: rgb(52, 211, 153);
          box-shadow: 0 0 22px rgba(52, 211, 153, 0.2);
        }

        /* Typing bounce */
        @keyframes ac-typing-bounce {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1;   }
        }

        /* Message entrance */
        @keyframes ac-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .ac-msg {
          animation: ac-msg-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Input focus ring — emerald accent */
        .ac-input:focus-visible {
          outline: none;
          border-color: rgba(52, 211, 153, 0.4) !important;
          box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.15);
        }

        /* Send button */
        .ac-send {
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .ac-send:not(:disabled):hover {
          background-color: rgb(52, 211, 153);
          box-shadow: 0 0 16px rgba(52, 211, 153, 0.25);
        }
        .ac-send:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.5);
        }

        /* Suggested prompt chip */
        .ac-prompt-chip {
          transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
        }
        .ac-prompt-chip:hover {
          border-color: rgba(52, 211, 153, 0.35);
          color: rgba(52, 211, 153, 0.85);
          background-color: rgba(52, 211, 153, 0.05);
        }

        /* Glass panel */
        .ac-glass {
          background-color: rgba(10, 10, 10, 0.88);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }

        /* Thin emerald scrollbar */
        .ac-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar {
          width: 3px;
        }
        .ac-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar-track {
          background: transparent;
        }
        .ac-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb {
          background: rgba(52, 211, 153, 0.2);
          border-radius: 0;
        }
      `}</style>

      {/* ── Portal root: fixed, full-screen, pointer-events-none base ─ */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-end justify-end gap-4 p-5 pointer-events-none sm:p-6"
        aria-label="Agentic AI Assistant"
      >

        {/* ── Chat window ─────────────────────────────────────────── */}
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Agentic AI Assistant chat window"
            className="ac-window-enter ac-glass pointer-events-auto flex w-full flex-col border border-neutral-800 shadow-2xl sm:w-96"
            style={{ height: "520px", maxHeight: "calc(100dvh - 96px)" }}
          >
            <Card className="flex h-full flex-col rounded-none border-0 bg-transparent shadow-none">

              {/* ── Header ────────────────────────────────────────── */}
              <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 px-5 py-4">

                <div className="flex items-center gap-3">
                  {/* Pulsing indicator — signals live/connected */}
                  <span className="relative flex h-2 w-2">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"
                      style={{ animation: "ac-typing-bounce 2s ease-in-out infinite" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>

                  <div>
                    <p className="ac-font-display text-sm text-neutral-100 leading-none">
                      Agentic AI Assistant
                    </p>
                    <p className="ac-font-mono mt-1 text-xs text-neutral-600">
                      RAG · Neon pgvector · Gemini
                    </p>
                  </div>
                </div>

                {/* Status badge + close */}
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="ac-font-mono rounded-none border-emerald-900 px-2 py-0.5 text-xs text-emerald-600"
                  >
                    Live
                  </Badge>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat window"
                    className="flex h-6 w-6 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* ── Message area ──────────────────────────────────── */}
              <ScrollArea className="ac-scroll flex-1 overflow-hidden px-5 py-5">

                {/* Empty state — show suggested prompts */}
                {messages.length === 0 && (
                  <div className="flex h-full flex-col justify-between">

                    {/* Welcome copy */}
                    <div>
                      <p className="ac-font-display mb-1 text-lg text-neutral-200">
                        Ask me anything.
                      </p>
                      <p className="ac-font-mono text-xs font-light leading-relaxed text-neutral-600">
                        I have full context on this engineer&apos;s architecture decisions,
                        projects, and technical philosophy.
                      </p>
                    </div>

                    {/* Suggested prompts */}
                    <div className="mt-6 flex flex-col gap-2">
                      <p className="ac-font-mono mb-1 text-xs tracking-widest text-neutral-700 uppercase">
                        Suggested
                      </p>
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSuggestedPrompt(prompt)}
                          className="ac-prompt-chip ac-font-mono w-full border border-neutral-800 bg-transparent px-3 py-2.5 text-left text-xs text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                        >
                          {prompt}
                          <span aria-hidden="true" className="ml-1 text-neutral-700">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message list */}
                {messages.length > 0 && (
                  <div className="flex flex-col gap-5">
                    {messages.map((message) => {
                      const isUser = message.role === "user";

                      return (
                        <div
                          key={message.id}
                          className={`ac-msg flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                        >
                          {/* Avatar */}
                          <Avatar
                            className="mt-0.5 h-6 w-6 shrink-0 rounded-none border border-neutral-800"
                            aria-hidden="true"
                          >
                            <AvatarFallback
                              className={`ac-font-mono rounded-none text-xs ${
                                isUser
                                  ? "bg-neutral-800 text-neutral-300"
                                  : "bg-emerald-950 text-emerald-500"
                              }`}
                            >
                              {isUser ? "You" : "AI"}
                            </AvatarFallback>
                          </Avatar>

                          {/* Bubble */}
                          <div
                            className={`max-w-xs flex-1 ${isUser ? "flex flex-col items-end" : ""}`}
                          >
                            <p
                              className={`ac-font-mono inline-block px-3 py-2.5 text-xs font-light leading-relaxed ${
                                isUser
                                  ? "bg-neutral-800 text-neutral-200"
                                  : "bg-transparent text-neutral-300"
                              }`}
                            >
                              {getMessageText(message)}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {/* Typing indicator — shown while AI is streaming */}
                    {isLoading && (
                      <div className="ac-msg flex gap-3">
                        <Avatar
                          className="mt-0.5 h-6 w-6 shrink-0 rounded-none border border-neutral-800"
                          aria-hidden="true"
                        >
                          <AvatarFallback className="ac-font-mono rounded-none bg-emerald-950 text-xs text-emerald-500">
                            AI
                          </AvatarFallback>
                        </Avatar>
                        <TypingIndicator />
                      </div>
                    )}
                    
                    {/* Error message */}
                    {error && (
                      <div className="ac-msg flex gap-3">
                        <Avatar
                          className="mt-0.5 h-6 w-6 shrink-0 rounded-none border border-red-900/50"
                          aria-hidden="true"
                        >
                          <AvatarFallback className="ac-font-mono rounded-none bg-red-950/50 text-xs text-red-500">
                            !
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-xs flex-1">
                          <p className="ac-font-mono inline-block border border-red-900/50 bg-red-950/20 px-3 py-2.5 text-xs font-light leading-relaxed text-red-400">
                            Connection failed. Ensure the database is active and reachable. ({error.message})
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Auto-scroll anchor */}
                    <div ref={bottomRef} aria-hidden="true" />
                  </div>
                )}
              </ScrollArea>

              {/* ── Input area ────────────────────────────────────── */}
              <div className="shrink-0 border-t border-neutral-800 px-4 py-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isLoading && input.trim()) {
                      void sendMessage({ text: input.trim() });
                      setInput("");
                    }
                  }}
                  className="flex gap-2"
                  aria-label="Send a message"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about architecture, projects…"
                    disabled={isLoading}
                    aria-label="Message input"
                    className="ac-input ac-font-mono h-9 flex-1 rounded-none border-neutral-800 bg-neutral-900 px-3 text-xs text-neutral-300 placeholder:text-neutral-700 focus-visible:ring-0"
                  />

                  <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                    className="ac-send h-9 w-9 shrink-0 rounded-none border border-neutral-700 bg-neutral-900 p-0 text-neutral-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <SendIcon className="h-3.5 w-3.5" />
                  </Button>
                </form>

                {/* Footer attribution */}
                <p className="ac-font-mono mt-2.5 text-center text-xs text-neutral-700">
                  Powered by Gemini · pgvector · Vercel AI SDK
                </p>
              </div>

            </Card>
          </div>
        )}

        {/* ── FAB — Floating Action Button ────────────────────────── */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
          className={`ac-fab pointer-events-auto flex h-12 w-12 items-center justify-center border border-neutral-700 bg-neutral-950 text-neutral-100 shadow-lg focus-visible:outline-none ${
            isOpen ? "ac-fab-open text-neutral-950" : ""
          }`}
        >
          {isOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <SparklesIcon className="h-5 w-5" />
          )}

          {/* Unread indicator dot — shown before first interaction */}
          {!hasInteracted && !isOpen && (
            <span
              aria-hidden="true"
              className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500"
              style={{ animation: "ac-typing-bounce 2s ease-in-out infinite" }}
            />
          )}
        </button>

      </div>
    </>
  );
}

export default AgentChat;
