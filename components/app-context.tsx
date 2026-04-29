"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  type AIMessage,
  type AppUser,
  type Conversation,
  type Friend,
  type Message,
  AI_DEMO_GREETING,
  DEFAULT_FRIEND_IDS,
  DEFAULT_USER,
  PRESEEDED_CONVERSATIONS,
  STOCK_FRIENDS,
} from "@/lib/app-data";

const STORAGE_KEY = "animal-buds-app-v2";

// Pairing code validation. Demo prototype — accepts any non-empty code,
// normalizes to uppercase for consistent display.
export type PairingResult =
  | { ok: true; code: string }
  | { ok: false; error: string };

export function validatePairingCode(input: string): PairingResult {
  const cleaned = input.trim().toUpperCase();
  if (!cleaned) return { ok: false, error: "Enter a code from your Bud's screen." };
  return { ok: true, code: cleaned };
}

type StoredState = {
  user: AppUser;
  friendIds: string[];
  conversations: Record<string, Message[]>;
  aiMessages: AIMessage[];
};

type AppContextValue = {
  user: AppUser;
  friends: Friend[];
  conversations: Record<string, Message[]>;
  aiMessages: AIMessage[];
  hydrated: boolean;
  // Friend management
  addFriend: (friendId: string) => void;
  removeFriend: (friendId: string) => void;
  isFriendAdded: (friendId: string) => boolean;
  // Messages
  sendMessage: (friendId: string, text: string) => void;
  receiveAutoReply: (friendId: string, text: string) => void;
  getMessagesFor: (friendId: string) => Message[];
  getLastMessage: (friendId: string) => Message | undefined;
  // AI chat
  sendAIMessage: (text: string) => void;
  receiveAIMessage: (text: string) => void;
  resetAIChat: () => void;
  // Profile
  updateUser: (patch: Partial<AppUser>) => void;
  // Bear pairing
  pairBear: (code: string) => PairingResult;
  unpairBear: () => void;
  // Reset (useful for demo)
  resetApp: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function defaultState(): StoredState {
  return {
    user: DEFAULT_USER,
    friendIds: [...DEFAULT_FRIEND_IDS],
    conversations: DEFAULT_FRIEND_IDS.reduce<Record<string, Message[]>>((acc, id) => {
      acc[id] = [...(PRESEEDED_CONVERSATIONS[id] ?? [])];
      return acc;
    }, {}),
    aiMessages: [
      {
        id: "ai-greeting",
        role: "assistant",
        text: AI_DEMO_GREETING,
        sentAt: Date.now(),
      },
    ],
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredState;
        setState(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const friends = useMemo(
    () =>
      state.friendIds
        .map((id) => STOCK_FRIENDS.find((f) => f.id === id))
        .filter((f): f is Friend => Boolean(f)),
    [state.friendIds]
  );

  const addFriend = useCallback((friendId: string) => {
    setState((s) => {
      if (s.friendIds.includes(friendId)) return s;
      return {
        ...s,
        friendIds: [...s.friendIds, friendId],
        conversations: {
          ...s.conversations,
          [friendId]: s.conversations[friendId] ?? [...(PRESEEDED_CONVERSATIONS[friendId] ?? [])],
        },
      };
    });
  }, []);

  const removeFriend = useCallback((friendId: string) => {
    setState((s) => ({
      ...s,
      friendIds: s.friendIds.filter((id) => id !== friendId),
    }));
  }, []);

  const isFriendAdded = useCallback(
    (friendId: string) => state.friendIds.includes(friendId),
    [state.friendIds]
  );

  const sendMessage = useCallback((friendId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setState((s) => ({
      ...s,
      conversations: {
        ...s.conversations,
        [friendId]: [
          ...(s.conversations[friendId] ?? []),
          {
            id: crypto.randomUUID(),
            fromMe: true,
            text: trimmed,
            sentAt: Date.now(),
          },
        ],
      },
    }));
  }, []);

  const receiveAutoReply = useCallback((friendId: string, text: string) => {
    setState((s) => ({
      ...s,
      conversations: {
        ...s.conversations,
        [friendId]: [
          ...(s.conversations[friendId] ?? []),
          {
            id: crypto.randomUUID(),
            fromMe: false,
            text,
            sentAt: Date.now(),
          },
        ],
      },
    }));
  }, []);

  const getMessagesFor = useCallback(
    (friendId: string) => state.conversations[friendId] ?? [],
    [state.conversations]
  );

  const getLastMessage = useCallback(
    (friendId: string) => {
      const messages = state.conversations[friendId] ?? [];
      return messages[messages.length - 1];
    },
    [state.conversations]
  );

  const sendAIMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setState((s) => ({
      ...s,
      aiMessages: [
        ...s.aiMessages,
        { id: crypto.randomUUID(), role: "user", text: trimmed, sentAt: Date.now() },
      ],
    }));
  }, []);

  const receiveAIMessage = useCallback((text: string) => {
    setState((s) => ({
      ...s,
      aiMessages: [
        ...s.aiMessages,
        { id: crypto.randomUUID(), role: "assistant", text, sentAt: Date.now() },
      ],
    }));
  }, []);

  const resetAIChat = useCallback(() => {
    setState((s) => ({
      ...s,
      aiMessages: [
        {
          id: "ai-greeting",
          role: "assistant",
          text: AI_DEMO_GREETING,
          sentAt: Date.now(),
        },
      ],
    }));
  }, []);

  const updateUser = useCallback((patch: Partial<AppUser>) => {
    setState((s) => ({ ...s, user: { ...s.user, ...patch } }));
  }, []);

  const pairBear = useCallback((code: string): PairingResult => {
    const result = validatePairingCode(code);
    if (result.ok) {
      setState((s) => ({ ...s, user: { ...s.user, pairedBearCode: result.code } }));
    }
    return result;
  }, []);

  const unpairBear = useCallback(() => {
    setState((s) => ({ ...s, user: { ...s.user, pairedBearCode: null } }));
  }, []);

  const resetApp = useCallback(() => {
    setState(defaultState());
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user: state.user,
      friends,
      conversations: state.conversations,
      aiMessages: state.aiMessages,
      hydrated,
      addFriend,
      removeFriend,
      isFriendAdded,
      sendMessage,
      receiveAutoReply,
      getMessagesFor,
      getLastMessage,
      sendAIMessage,
      receiveAIMessage,
      resetAIChat,
      updateUser,
      pairBear,
      unpairBear,
      resetApp,
    }),
    [
      state.user,
      friends,
      state.conversations,
      state.aiMessages,
      hydrated,
      addFriend,
      removeFriend,
      isFriendAdded,
      sendMessage,
      receiveAutoReply,
      getMessagesFor,
      getLastMessage,
      sendAIMessage,
      receiveAIMessage,
      resetAIChat,
      updateUser,
      pairBear,
      unpairBear,
      resetApp,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
