import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';
import { LIGHT_BLUE } from '../constants';

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>()
  const {params: {userId, name}} = useRoute<ModalScreenRouteProp>()
  const {loading, error, orders} = useCustomerOrders(userId)
  const tw = useTailwind()

  return (
    <View>
      {/* top-right "close" button  */}
      <TouchableOpacity onPress={navigation.goBack} style={tw('absolute right-5 top-5 z-10')}>
        <Icon
          name='closecircle'
          type='antdesign'
        />
      </TouchableOpacity>

      <View style={{marginTop: 10}}>
        <Text style={[tw("text-center text-xl font-bold"), {color: LIGHT_BLUE}]}>
          {name}
        </Text>
        <Text style={[tw("text-center italic text-sm")]}>Deliveries</Text>
      </View>

      <FlatList
        contentContainerStyle={{paddingBottom: 200}}
        data={orders}
        keyExtractor={(item: Order) => item.trackingId}
        renderItem={({item: order}) => <DeliveryCard order={order} />}
      />
    </View>
  )
}

export default ModalScreen