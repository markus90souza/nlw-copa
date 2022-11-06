import { useState } from 'react'
import { Heading, useToast, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { api } from '@services/api'

const Find = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const toast = useToast()
  const { navigate } = useNavigation()

  const handleJoinPool = async () => {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: `você entrou no grupo ${code}`,
        placement: 'top',
        bgColor: 'green.500',
      })
      navigate('pools')
      setCode('')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setCode('')
      if (error.response?.data?.message === 'Bolão não encontrado!') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (
        error.response?.data?.message ===
        'Você já esta participando deste bolão'
      ) {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }
      toast.show({
        title: 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header title={'Criar novo bolão'} showBackButton />
      <VStack mt={8} mx={5} alignItems={'center'}>
        <Heading
          fontFamily={'heading'}
          fontSize={'xl'}
          color={'white'}
          mb={8}
          textAlign={'center'}
        >
          Encontre um bolão através de {'\n'} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder={'Qual o código do bolão?'}
          autoCapitalize={'characters'}
          value={code}
          onChangeText={setCode}
        />

        <Button
          title={'BUSCAR BOLÃO'}
          variant={'secondary'}
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}

export { Find }
