import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { TeamDetailScreen } from '../../features/team/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  team: { id: string }
  'user-detail': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="team"
        component={TeamDetailScreen}
        options={{
          title: 'Team',
        }}
      />
    </Stack.Navigator>
  )
}
