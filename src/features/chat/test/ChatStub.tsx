import { useParams } from 'react-router-dom'

export default function ChatStub() {
  const { exchangeId } = useParams()
  return <p>Chat abierto: {exchangeId}</p>
}