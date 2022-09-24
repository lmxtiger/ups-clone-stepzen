import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import ModalScreen from '../screens/ModalScreen'

export type RootStackParamList = {
  Main: undefined,
  MyModal: {userId: string, name: string},
  Order: {order: any}
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name='Main'
          component={TabNavigator}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{presentation: "modal"}}>
        <RootStack.Screen
          name='MyModal'
          options={{headerShown: false}}
          component={ModalScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}