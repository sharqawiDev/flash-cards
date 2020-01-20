import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeckList from "./components/DeckList"
import NewDeck from "./components/NewDeck"

const App = createBottomTabNavigator({
  Decks: DeckList,
  "New Deck": NewDeck,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Decks') {
          iconName = focused
            ? 'md-list-box'
            : 'md-list-box';
        } else if (routeName === 'New Deck') {
          iconName = focused ? 'md-add-circle' : 'md-add-circle';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(App)