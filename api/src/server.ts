import Fastify from "fastify"
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { poolRoutes } from "./routes/pool.routes"
import { authRoutes } from "./routes/auth.routes"
import { gameRoutes } from "./routes/game.routes"
import { guessRoutes } from "./routes/guess.routes"
import { userRoutes } from "./routes/user.routes"

async function boot() {
  const app = Fastify({
    logger: true
  })

  app.register(cors,{
     origin: true
  })

  app.register(jwt, {
    secret: 'nlwcopa'
  })

  await app.register(authRoutes)
  await app.register(gameRoutes)
  await app.register(guessRoutes)

  await app.register(userRoutes)
  await app.register(poolRoutes)

  await app.listen({ port: 3333, host: '0.0.0.0'})
}

boot()