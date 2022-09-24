import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { OrdersScreenNavigationProp } from '../screens/OrdersScreen'
import { Card, Icon } from '@rneui/themed'
import { CUSTOM_PINK } from '../constants'

type Props = {
  item: Order
}

const OrderCard = ({item: order}: Props) => {
  const navigation = useNavigation<OrdersScreenNavigationProp>()
  const tw = useTailwind()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Order', {order})}
    >
      <Card containerStyle={tw('px-5 rounded-lg')}>
        <View style={tw('flex-row justify-between items-center')}>
          <View>
            <Icon
              name='truck-delivery'
              color={CUSTOM_PINK}
              type='material-community'
            />
            <Text style={{fontSize: 10}}>
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View>
            <Text style={[tw('text-gray-400'), {fontSize: 10}]}>
              {order.carrier}-{order.trackingId}
            </Text>
            <Text style={tw('text-gray-500 text-xl')}>
              {order.trackingItems.customer.name}
            </Text>
          </View>

          <View style={tw('flex-row items-center')}>
            <Text style={[tw('text-sm'), {color: CUSTOM_PINK}]}>
              {order.trackingItems.items.length} x
            </Text>
            <Icon
              style={tw('ml-2')}
              name='box'
              type='feather'
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default OrderCard