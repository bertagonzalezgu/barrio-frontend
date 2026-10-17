import { useParams } from 'react-router-dom'
import { useChatDetail } from '../hooks/useChatDetail'
import { useChatMessages } from '../hooks/useChatMessages'
import { getChatErrorMessage } from '../utils/getChatErrorMessage'
import ChatHeader from '../components/ChatHeader'
import ReportExchange from '../components/ReportExchange'
import MessageList from '../components/MessageList'
import MessageForm from '../components/MessageForm'
import ConfirmExchange from '../components/ConfirmExchange'
import ChatActions from '../components/ChatActions'
import { isChatWritable } from '../utils/isChatWritable'


export default function ChatPage() {
  const { exchangeId = '' } = useParams()
  const { data: chat, isPending, isError, error } = useChatDetail(exchangeId)
  const messages = useChatMessages(exchangeId)

  if (isPending) return <p>Cargando chat...</p>
  if (isError) return <p role="alert">{getChatErrorMessage(error)}</p>
  
  return (
    <main>
      <ChatHeader chat={chat} />
      <ReportExchange exchangeId={exchangeId} />
      <ConfirmExchange chat={chat} />
      <ChatActions chat={chat} />
      {messages.isPending ? (
        <p>Cargando mensajes...</p>
      ) : (
        <MessageList messages={messages.data ?? []} otherName={chat.other.name} />
      )}
      {isChatWritable(chat.status) ? (
        <MessageForm exchangeId={exchangeId} />
        ) : (
        <p role="status">
            Este chat está cerrado. Puedes leer la conversación, pero ya no se pueden enviar mensajes.
        </p>
        )}
    </main>
  )
}