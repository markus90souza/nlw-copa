import { useState } from 'react'
import { Heading, Text, useToast, VStack } from 'native-base'
import { Header } from '@components/Header'

import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Keyboard } from 'react-native'
import { api } from '@services/api'
import { useNavigation } from '@react-navigation/native'

const New = () => {
  const [pool, setPool] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const { navigate } = useNavigation()

  async function handlePoolCreate() {
    if (!pool.trim()) {
      return toast.show({
        title: 'Informer um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    try {
      setIsLoading(true)

      await api.post('/pools', { title: pool.toUpperCase() })

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      setPool('')
      Keyboard.dismiss()
      navigate('pools')
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header title={'Criar novo Bolão'} />
      <VStack mt={8} mx={5} alignItems={'center'}>
        <Logo />

        <Heading
          fontFamily={'heading'}
          fontSize={'xl'}
          color={'white'}
          my={8}
          textAlign={'center'}
        >
          Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder={'Qual nome do seu bolão?'}
          value={pool}
          onChangeText={setPool}
        />

        <Button
          title={'Criar meu Bolão'}
          variant={'secondary'}
          onPress={handlePoolCreate}
          isLoading={isLoading}
          isLoadingText={'Criando bolão'}
        />

        <Text
          mt={4}
          px={10}
          fontSize={'sm'}
          color={'gray.200'}
          textAlign={'center'}
        >
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}

export { New }
