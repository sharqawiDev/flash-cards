import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation-stack"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Colors from "./utils/colors"
import DeckList from "./components/DeckList"
import DeckDetails from "./components/DeckDetails"
import NewDeck from "./components/NewDeck"
import AddCard from "./components/AddCard"
import Quiz from "./components/Quiz"



const MainNavigator = createStackNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.blue,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.blue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.blue,
      }
    }
  }
})

const NewDeckNavigator = createStackNavigator({
  "New Deck": {
    screen: NewDeck,
    navigationOptions: {
      header: null
    }
  },
  Decks: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.blue,
      }
    }
  },
})

export default createAppContainer(createBottomTabNavigator({
  Decks: { screen: MainNavigator },
  "New Deck": { screen: NewDeckNavigator },
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
))