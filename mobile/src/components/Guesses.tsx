import { useEffect, useState } from 'react'
import { Box, FlatList, useToast, Text } from 'native-base'
import { Game, GameProps } from './Game'
import { api } from '@services/api'
import { Alert } from 'react-native'
import { Loading } from './Loading'
import { EmptyPoolList } from './Empty/EmptyPoolList'
import { EmptyMyPoolList } from './Empty/EmptyMyPoolList'
interface Props {
  poolId: string
  code: string
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const toast = useToast()
  const getGames = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)

      setGames(response.data.games)

      console.log(response.data)
    } catch (error) {
      toast.show({
        title: 'não foi possivel carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateGuessConfirm = async (gameId: string) => {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Infome o placar dos jogos para confirmar o palpite',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
        title: 'Palpite criado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })

      getGames()
    } catch (error) {
      toast.show({
        title: 'não foi possivel enviar o palpite',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    getGames()
  }, [poolId])

  if (isLoading) {
    return <Loading />
  }
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleCreateGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
      _contentContainerStyle={{ pb: 10 }}
    />
  )
}
