import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

const gameRoutes = async (route: FastifyInstance) =>{
  route.get('/pools/:id/games', { onRequest: [authenticate]}, async ( request, reply) => {
    const IParams = z.object({
      id: z.string()
    })

    const { id } =  IParams.parse(request.params)

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              poolId: id
            }
          }
        }
      }
    })

    return { 
      games: games.map(game => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined
        }
      })
    }
  })
}

export { gameRoutes }