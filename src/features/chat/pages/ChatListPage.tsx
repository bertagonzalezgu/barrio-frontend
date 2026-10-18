import { useChats } from '../hooks/useChats'
import ChatListSection from '../components/ChatListSection'
import { groupChatsByStatus } from '../utils/groupChatsByStatus'

export default function ChatListPage() {
  const { data: chats, isPending, isError } = useChats()

  if (isPending) return <p>Cargando conversaciones…</p>
  if (isError) return <p role="alert">No se han podido cargar tus conversaciones.</p>

  const { open, closed } = groupChatsByStatus(chats)

  return (
    <section>
      <h1>Chats</h1>
      {open.length > 0 && <ChatListSection title="En curso" chats={open} />}
      {closed.length > 0 && <ChatListSection title="Cerrados" chats={closed} />}
    </section>
  )
}