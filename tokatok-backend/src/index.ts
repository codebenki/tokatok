import { Hono } from 'hono'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

const app = new Hono()

app.get('/', (c) => c.text('Hello from Hono!'))

const server = createServer(app.fetch as any)

const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  io.emit('welcome', 'Welcome to the chat!')

  socket.on('chat', (msg) => {
    io.emit('chat', msg)
  })
})

server.listen(3000, () => {
  console.log('Server running on port 3000')
})
