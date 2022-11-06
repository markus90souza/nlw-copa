import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pools } from '@screens/Pools'
import { Details } from '@screens/Pools/Details'
import { Find } from '@screens/Pools/Find'
import { New } from '@screens/Pools/New'
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { Platform } from 'react-native'

const { Group, Navigator, Screen } = createBottomTabNavigator()

const AppRoutes = () => {
  const { colors, sizes } = useTheme()

  const size = sizes[6]
  return (
    <Navigator>
      <Group
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.yellow[500],
          tabBarInactiveTintColor: colors.gray[300],
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            position: 'absolute',
            height: sizes[20],
            borderTopWidth: 0,
            backgroundColor: colors.gray[800],
          },
          tabBarItemStyle: {
            position: 'relative',
            top: Platform.OS === 'ios' ? '-10' : 0,
          },
        }}
      >
        <Screen
          name="new"
          component={New}
          options={{
            tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
            tabBarLabel: 'Novo bolão',
          }}
        />
        <Screen
          name="pools"
          component={Pools}
          options={{
            tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
            tabBarLabel: 'Meus bolões',
          }}
        />

        <Screen
          name="find"
          component={Find}
          options={{
            tabBarButton: () => null,
          }}
        />

        <Screen
          name="details"
          component={Details}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Group>
    </Navigator>
  )
}

export { AppRoutes }
