import { useChats } from '../hooks/useChats'
import ChatListItem from '../components/ChatListItem'

export default function ChatListPage() {
  const { data: chats, isPending, isError } = useChats()

  if (isPending) return <p>Cargando conversaciones…</p>
  if (isError) return <p role="alert">No se han podido cargar tus conversaciones.</p>

  return (
    <section>
      <h1>Chats</h1>
      <ul>
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ul>
    </section>
  )
}