import { Icon, useToast, VStack, FlatList } from 'native-base'

import { Octicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { api } from '@services/api'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { PoolCard, PoolCardProps } from '@components/PoolCard'
import { EmptyPoolList } from '@components/Empty/EmptyPoolList'

const Pools = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolCardProps[]>([])

  const { navigate } = useNavigation()
  const toast = useToast()

  const getPools = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')
      console.log(response.data)

      setPools(response.data.pools)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPools()
    }, []),
  )

  const handlePoolFind = () => {
    navigate('find')
  }

  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header title={'Meus bolões'} />
      <VStack
        borderBottomWidth={1}
        borderBottomColor={'gray.600'}
        pb={4}
        mb={4}
        mt={6}
        mx={5}
      >
        <Button
          title={'BUSCAR BOLÃO por código'}
          variant={'secondary'}
          leftIcon={
            <Icon as={Octicons} name={'search'} color={'black'} size={'md'} />
          }
          onPress={handlePoolFind}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          ListEmptyComponent={<EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      )}
    </VStack>
  )
}

export { Pools }
