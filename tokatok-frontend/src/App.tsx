import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    socket.on('message', (msg: string) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on('chat', (msg: string) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      socket.off('message')
      socket.off('chat')
    }
  }, [])

  const sendMessage = () => {
    if (input.trim() === '') return
    socket.emit('chat', input)
    setInput('') // clear input after sending
  }

  socket.on('welcome', (msg) => {
    console.log(msg)
  })


  return (
    <div style={{ padding: 20 }}>
      <h1>Socket.IO Chat Test</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send Message</button>

      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
