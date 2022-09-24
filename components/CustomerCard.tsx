import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen'
import { Card } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { LIGHT_BLUE } from '../constants'

type Props = {
  userId: string,
  name: string,
  email: string,
}

const CustomerCard = ({userId, name, email}: Props) => {
  const {loading, error, orders} = useCustomerOrders(userId)
  const tw = useTailwind()
  const navigation = useNavigation<CustomerScreenNavigationProp>()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyModal', {
      userId,
      name,
    })}>
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={tw("text-2xl font-bold")}>{name}</Text>
              <Text style={[tw("text-sm"), {color: LIGHT_BLUE}]}>ID: {userId}</Text>
            </View>

            <View>
              <Text style={{color: LIGHT_BLUE}}>{loading ? "loading..." : `${orders.length} x`}</Text>
              <Icon
                style={tw("mb-5 ml-auto")}
                name="box"
                type='entypo'
                color={LIGHT_BLUE}
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default CustomerCard
