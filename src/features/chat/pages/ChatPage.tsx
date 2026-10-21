import { useParams } from 'react-router-dom'
import { useChatDetail } from '../hooks/useChatDetail'
import { useChatMessages } from '../hooks/useChatMessages'
import { getChatErrorMessage } from '../utils/getChatErrorMessage'
import { isChatWritable } from '../utils/isChatWritable'
import ChatHeader from '../components/ChatHeader'
import ReportExchange from '../components/ReportExchange'
import MessageList from '../components/MessageList'
import MessageForm from '../components/MessageForm'
import ConfirmExchange from '../components/ConfirmExchange'
import ChatActions from '../components/ChatActions'
import RatePrompt from '../components/RatePrompt'


export default function ChatPage() {
  const { exchangeId = '' } = useParams()
  const { data: chat, isPending, isError, error } = useChatDetail(exchangeId)
  const messages = useChatMessages(exchangeId)

  if (isPending) return <p className="text-xs font-body text-ink-muted text-center mt-8">Cargando chat...</p>
  if (isError) {
    return (
      <p role="alert" className="text-xs font-body text-danger-ink text-center mt-8">
        {getChatErrorMessage(error)}
      </p>
    )
  }

  return (
    <section className="flex flex-col min-h-[calc(100dvh-4rem)] px-4 pt-6 pb-4 max-w-lg mx-auto gap-4">
      <ChatHeader chat={chat} />
      <ReportExchange exchangeId={exchangeId} />
      <ConfirmExchange chat={chat} />
      <RatePrompt chat={chat} />
      <ChatActions chat={chat} />
      {messages.isPending ? (
        <p className="flex-1 text-xs font-body text-ink-muted text-center">Cargando mensajes...</p>
      ) : (
        <MessageList messages={messages.data ?? []} otherName={chat.other.name} />
      )}
      {isChatWritable(chat.status) ? (
        <MessageForm exchangeId={exchangeId} />
      ) : (
        <p role="status" className="rounded-2xl border border-line bg-surface-2 px-4 py-3 text-center font-body text-sm text-ink-muted">
          Este chat está cerrado. Puedes leer la conversación, pero ya no se pueden enviar mensajes.
        </p>
      )}
    </section>
  )
}