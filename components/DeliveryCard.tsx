import { View, Text } from 'react-native'
import React from 'react'
import { Card, Divider, Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { LIGHT_BLUE } from '../constants'
import MapView, {Marker} from 'react-native-maps'

type Props = {
  order: Order
}

const DeliveryCard = ({order: {Lat: latitude, Lng: longitude, ...order}}: Props) => {
  const tw = useTailwind()

  return (
    <Card
      containerStyle={[
        tw("rounded-lg my-2"),
        {
          backgroundColor: LIGHT_BLUE,
          padding: 0,
          paddingTop: 16,
          shadowColor: "black",
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.4,
          shadowRadius: 4,
        },
      ]}
    >
      <View>
        <Icon
          name='box'
          type='entypo'
          size={50}
          color="white"
        />

        <View>
          <Text
            style={tw('text-xs text-center uppercase text-white font-bold')}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tw('text-white text-center text-lg font-bold')}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color='white'/>
        </View>

        <View style={tw('mx-auto pb-5')}>
          <Text style={tw('text-base text-center text-white font-bold mt-5')}>
            Address
          </Text>
          <Text style={tw('text-center text-sm text-white')}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw('text-center text-sm italic text-white')}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
      </View>

      <Divider color='white' />

      <View style={tw('p-5')}>
        {order.trackingItems.items.map(({name, quantity}, index) => (
          <View style={tw('flex-row justify-between items-center')}>
            <Text style={tw('text-sm italic text-white')}>{name}</Text>
            <Text style={tw('text-xl text-white')}>x {quantity}</Text>
          </View>
        ))}
      </View>

      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[tw('w-full'), {height: 200}]}
      >
        {longitude && latitude && (
          <Marker
            coordinate={{
              latitude, longitude
            }}
            title='Delivery Location'
            description={order.Address}
            identifier='destination'
          />
        )}
      </MapView>
    </Card>
  )
}

export default DeliveryCard