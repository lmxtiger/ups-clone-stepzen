import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import RootNavigator from './navigator/RootNavigator';
import CustomersScreen from './screens/CustomersScreen';
import utilities from './tailwind.json';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  // Your API url is https://fabens.stepzen.net/api/honking-zorse/__graphql
  uri: false ? "https://fabens.stepzen.net/api/honking-zorse/__graphql" : 'http://172.20.17.94:5001/api/honking-zorse',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore- TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// npx expo start: watchman error fix
// https://stackoverflow.com/questions/72526935/jest-haste-map-watchman-crawl-failed-retrying-once-with-node-crawler