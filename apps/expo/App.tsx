import 'expo-dev-client'
import React from 'react'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'

export default function App(children) {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      {children}
    </Provider>
  )
}
