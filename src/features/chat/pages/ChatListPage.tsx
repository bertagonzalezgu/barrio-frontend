import { useChats } from '../hooks/useChats'
import ChatListSection from '../components/ChatListSection'
import { groupChatsByStatus } from '../utils/groupChatsByStatus'

export default function ChatListPage() {
  const { data: chats, isPending, isError } = useChats()

  if (isPending) {
    return <p className="mt-8 text-center font-body text-xs text-ink-muted">Cargando conversaciones…</p>
  }
  if (isError) {
    return (
      <p
        role="alert"
        className="mx-4 mt-8 alert-error"
      >
        No se han podido cargar tus conversaciones.
      </p>
    )
  }

  const { open, closed } = groupChatsByStatus(chats)

  return (
    <section className="mx-auto flex max-w-lg flex-col gap-6 px-4 pb-4 pt-6">
      <h1 className="font-display text-h3 font-bold text-ink">Chats</h1>
      {chats.length === 0 && (
        <p className="mt-2 text-center font-body text-sm text-ink-muted">Todavía no tienes conversaciones.</p>
      )}
      {open.length > 0 && <ChatListSection title="En curso" chats={open} />}
      {closed.length > 0 && <ChatListSection title="Cerrados" chats={closed} />}
    </section>
  )
}