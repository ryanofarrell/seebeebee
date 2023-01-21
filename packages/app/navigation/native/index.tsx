import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { TeamDetailScreen } from '../../features/team/team-screen'

const HomeStack = createNativeStackNavigator<{
  home: undefined
  'team': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <HomeStack.Screen
        name="team"
        component={TeamDetailScreen}
        options={{
          title: 'Team',
        }}
      />
    </HomeStack.Navigator>
  )
}
