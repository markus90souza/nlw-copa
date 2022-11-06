import { useEffect, useState } from 'react'
import { VStack, useToast, HStack } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { EmptyMyPoolList } from '@components/Empty/EmptyMyPoolList'
import { Header } from '@components/Header'
import { Loading } from '@components/Loading'
import { Option } from '@components/Option'
import { PoolCardProps } from '@components/PoolCard'
import { PoolHeader } from '@components/PoolHeader'
import { Share } from 'react-native'
import { Guesses } from '@components/Guesses'

type IParams = {
  id: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(false)
  const [optionSelected, setOptionSelected] = useState<
    'Seus palpites' | 'Ranking dos grupos'
  >('Seus palpites')
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps,
  )
  const route = useRoute()
  const toast = useToast()
  const { id } = route.params as IParams

  const getPoolDetails = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/pools/${id}`)
      setPoolDetails(data.pool)
    } catch (error) {
      toast.show({
        title: 'não foi possivel carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeShare = async () => [
    await Share.share({
      title: 'Código do bolão',
      message: poolDetails.code,
    }),
  ]

  useEffect(() => {
    getPoolDetails()
  }, [id])

  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack p={1} mb={5} bgColor={'gray.800'} rounded={'sm'}>
            <Option
              title={'Seus palpites'}
              isSelected={optionSelected === 'Seus palpites'}
              onPress={() => setOptionSelected('Seus palpites')}
            />
            <Option
              title={'Ranking dos grupos'}
              isSelected={optionSelected === 'Ranking dos grupos'}
              onPress={() => setOptionSelected('Ranking dos grupos')}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}

      {isLoading && <Loading />}
    </VStack>
  )
}
