import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"


const guessRoutes = async (route: FastifyInstance) => {
  route.get('/guesses/count',async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  route.post('/pools/:poolId/games/:gameId/guesses', {onRequest: [authenticate]}, async (request, reply) => {
    const IParams = z.object({
      poolId: z.string(),
      gameId: z.string()
    })

    const IRequest = z.object({
      firstTeamPoints: z.number(),
      secondTeamPoints : z.number()

      
    })

    const { poolId, gameId } = IParams.parse(request.params)
    const { firstTeamPoints, secondTeamPoints } = IRequest.parse(request.body)

    const participant = await prisma.participant.findUnique({
      where: {
        userId_poolId: {
          userId: request.user.sub, 
          poolId
          
        }
      }
    })

    console.log(participant?.userId)

    if(!participant){
      return reply.status(400).send({
        message: "you're not allowed to create guess inside this pool!"
      })
    }

    const guess = await prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          participantId: participant.id,
          gameId: gameId
        }

      }
    })

    if(guess){
      return reply.status(400).send({
        message: "you already a sent guess to the game in this pool"
      })
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      }
    })

    if(!game){
      return reply.status(400).send({
        message: "game not found"
      })
    }

    if(game.date < new Date()){
      return reply.status(400).send({
        message: "Você não pode participar de um jogo que ja aconteceu!"
      })
    }

    await prisma.guess.create({
      data: {
        gameId,
        participantId: participant.id,
        firstTeamPoints,
        secondTeamPoints 

      }
    })

    return reply.status(201).send()

  })
} 

export { guessRoutes }