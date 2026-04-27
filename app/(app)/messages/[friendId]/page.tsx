import ChatClient from "@/components/chat-client";

export const metadata = { title: "Chat — Animal Buds" };

export default async function ChatPage({
  params,
}: {
  params: Promise<{ friendId: string }>;
}) {
  const { friendId } = await params;
  return <ChatClient friendId={friendId} />;
}
