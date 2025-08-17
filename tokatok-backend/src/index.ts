import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors({
  origin: 'http://localhost:5173', //adjust later
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.get('/api/', (c) => {
  return c.text('Hello Hono!')
})

export default app
