import { Icon, VStack, Text } from 'native-base'
import Logo from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'

const SignIn = () => {
  const { signIn, isUserLoading } = useAuth()
  return (
    <VStack
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      bgColor={'gray.900'}
      p={7}
    >
      <Logo width={212} height={40} />

      <Button
        title={'Entrar com Google'}
        leftIcon={
          <Icon as={Fontisto} name={'google'} color={'white'} size={'md'} />
        }
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
      />

      <Text color={'gray.200'} textAlign={'center'} mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </VStack>
  )
}

export { SignIn }
