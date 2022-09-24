import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Image } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import useOrders from '../hooks/useOrders'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../navigator/RootNavigator'
import { TabStackParamList } from '../navigator/TabNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CUSTOM_PINK } from '../constants'
import OrderCard from '../components/OrderCard';

// type OrdersScreenRouteProp = RouteProp<TabStackParamList, 'Order'>

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>

const OrdersScreen = () => {
  const {loading, error, orders} = useOrders()
  const navigation = useNavigation<OrdersScreenNavigationProp>()
  const [ascending, setAscending] = useState<boolean>(false)
  const tw = useTailwind()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // Below: May not be necessary!
      tabBarLabel: ({focused, color}) => (
        <Text style={{
          color: focused ? CUSTOM_PINK : color,
          fontSize: 10,
        }}>
          Orders
        </Text>
      ),
    })
  }, [])

  return (
   <ScrollView style={{backgroundColor: CUSTOM_PINK}}>
    <Image
      source={{uri: 'https://links.papareact.com/m51'}}
      containerStyle={tw('w-full h-64')}
      PlaceholderContent={<ActivityIndicator />}
    />

    <View>
      <Button
        color='pink'
        titleStyle={{color: 'gray', fontWeight: '400'}}
        style={tw('py-2 px-5')}
        onPress={() => setAscending(!ascending)}
      >
        {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
      </Button>

      {orders
        ?.sort(
          (order1, order2) => ascending ?
          (new Date(order1.createdAt) < new Date(order2.createdAt) ? -1 : 1)
          :
          (new Date(order1.createdAt) < new Date(order2.createdAt) ? 1 : -1)
        )
        .map((order) => (
          <OrderCard key={order.trackingId} item={order} />
        ))
      }
    </View>
   </ScrollView>
  )
}

export default OrdersScreen