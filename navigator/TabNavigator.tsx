import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomersScreen from '../screens/CustomersScreen'
import OrdersScreen from '../screens/OrdersScreen'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { LIGHT_BLUE } from '../constants'

export type TabStackParamList = {
  Customers: undefined,
  Orders: undefined
}

const Tab = createBottomTabNavigator<TabStackParamList>()

const TabNavigator = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarActiveTintColor: LIGHT_BLUE,
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({focused, color, size}) => {
        if (route.name === "Customers") {
          return (
            <BottomTabBarIcon name='users' focused={focused} />
            // <Icon
            //   name='users'
            //   type='entypo'
            //   color={focused ? LIGHT_BLUE : "gray"}
            // />
          )
        } else if (route.name === "Orders") {
          return (
            <BottomTabBarIcon name='box' focused={focused} />
            // <Icon
            //   name='box'
            //   type='entypo'
            //   color={focused ? LIGHT_BLUE : "gray"}
            // />
          )
        }
      }
    })}>
      <Tab.Screen name='Customers' component={CustomersScreen} />
      <Tab.Screen name='Orders' component={OrdersScreen} />
    </Tab.Navigator>
  )
}

const BottomTabBarIcon = ({name, focused}: {name: string, focused: boolean}) => (
  <Icon
    name={name}
    type='entypo'
    color={focused ? LIGHT_BLUE : "gray"}
  />
)

export default TabNavigator