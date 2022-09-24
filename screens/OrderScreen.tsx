import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabStackParamList } from '../navigator/TabNavigator'
import { CUSTOM_PINK } from '../constants'
import DeliveryCard from '../components/DeliveryCard'

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>

type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'Order'>
>

const OrderScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation<OrderScreenNavigationProp>()
  const {params: {order}} = useRoute<OrderScreenRouteProp>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: CUSTOM_PINK,
      headerTitleStyle: {color: 'black'},
      headerBackTitle: 'Deliveries',
    })
  }, [order])

  return (
    <View style={tw('-mt-2')}>
      <DeliveryCard order={order} fullWidth />
    </View>
  )
}

export default OrderScreen