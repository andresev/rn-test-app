import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  ProductsListScreen,
  ProductScreen,
  WishListScreen,
  MainScreen,
  TodoAppScreen,
  TodoAppScreen2,
} from './src/screens';
import {Button} from 'react-native';

const Stack = createNativeStackNavigator();

const HeaderRightButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="WISHLIST"
      onPress={() => navigation.navigate('WishList' as never)}
    />
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="ProductsList"
          component={ProductsListScreen}
          options={{
            headerTitle: 'PRODUCTS',
            headerRight: () => <HeaderRightButton />,
          }}
        />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="WishList" component={WishListScreen} />
        <Stack.Screen name="TodoAppScreen" component={TodoAppScreen} />
        <Stack.Screen name="TodoAppScreen2" component={TodoAppScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
