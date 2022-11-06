import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"


const poolRoutes = async (route: FastifyInstance) =>{

  route.post('/pools',async (request, reply) => {

    const IRequest = z.object({
      title: z.string()
    })

   

    const { title } = IRequest.parse(request.body)
  
    const generateCode = new ShortUniqueId({ length: 6})

    const code = String(generateCode()).toUpperCase()

    try {
      await request.jwtVerify()
      await prisma.pool.create({
        data: {
          title, 
          code,
          ownerId: request.user.sub,
          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      
      })
      
    } catch {
      await prisma.pool.create({
        data: {
          title, 
          code
        }
      })
    }



    return reply.status(201).send({ code })
  })

  route.get('/pools', { onRequest: [authenticate] },async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some:{ 
            userId: request.user.sub
          }
        }
      },
      include:{
        owner: {
          select: {
            id: true,
            name: true
          }
        },
        participants: {
          select:{
            id: true,
            user: {
              select:{
                avatarUrl: true
              }
            }
          },
          
          take: 4
        },
        _count: {
          select: {
            participants: true
          }
        }
      }
    })

    return { pools } 
  })

  route.get('/pools/count',async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  route.post('/pools/join', { onRequest: [authenticate]}, async ( request, reply) => {
    const IRequest = z.object({
      code: z.string()
    })

    const { code } = IRequest.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where: {
        code
      },
      include: {
        participants: {
          where: {
            userId: request.user.sub
          }
        }
      }
    })

    if(!pool){
      return reply.status(400).send({
        message: 'Bolão não encontrado!'
      })
    }

    if(pool.participants.length > 0 ){
      return reply.status(400).send({
        message: 'Você já esta participando deste bolão'
      })
    }

    if(!pool.ownerId){
      await prisma.pool.update({
        where: {
          id: pool.id
        },
        data: {
          ownerId: request.user.sub
        }
      })
    }

    await prisma.participant.create({
      data:{
        poolId: pool.id,
        userId: request.user.sub
      }
    })

    return reply.status(201).send({
      message: 'Sua participação no bolão foi criada com sucesso'
    })
  })



  route.get('/pools/:id', { onRequest:  [authenticate] },async (request) => {
    const IParams = z.object({
      id: z.string()
    })

    const { id } = IParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: {
       id
      },
      include:{
        owner: {
          select: {
            id: true,
            name: true
          }
        },
        participants: {
          select:{
            id: true,
            user: {
              select:{
                avatarUrl: true
              }
            }
          },
          
          take: 4
        },
        _count: {
          select: {
            participants: true
          }
        }
      }
    })

    return { pool } 
  })

} 

export { poolRoutes }