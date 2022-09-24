import { View, Text } from 'react-native'
import React from 'react'
import { Card, Divider, Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { CUSTOM_PINK, LIGHT_BLUE } from '../constants'
import MapView, {Marker} from 'react-native-maps'

type Props = {
  order: Order
  fullWidth?: boolean
}

const DeliveryCard = ({order: {Lat: latitude, Lng: longitude, ...order}, fullWidth}: Props) => {
  const tw = useTailwind()

  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"} my-2`),
        {
          backgroundColor: fullWidth ? CUSTOM_PINK : LIGHT_BLUE,
          padding: 0,
          paddingTop: 16,
          shadowColor: "black",
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.4,
          shadowRadius: 4,
        },
      ]}
    >
      <View style={fullWidth && {height: '100%'}}>
        <Icon
          name='box'
          type='entypo'
          size={50}
          color="white"
        />

        <View style={tw('items-start p-5 -mt-3')}>
          <View style={tw('mx-auto')}>
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
          {order.trackingItems.items.map(({name, quantity, item_id}) => (
            // has to pass in a UNIQUE key id for each item of the list, otherwise expo go will complain
            <View key={item_id} style={tw('flex-row justify-between items-center')}>
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
          style={[tw('w-full'), {flex: 1}, !fullWidth && {height: 200}]}
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
      </View>
    </Card>
  )
}

export default DeliveryCard