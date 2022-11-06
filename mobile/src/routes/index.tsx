import { useAuth } from '@hooks/useAuth'
import { NavigationContainer } from '@react-navigation/native'
import { SignIn } from '@screens/SignIn'
import { AppRoutes } from './app.routes'

import { Box } from 'native-base'

const Routes = () => {
  const { user } = useAuth()
  return (
    <Box flex={1} bgColor={'gray.900'}>
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}

export { Routes }
