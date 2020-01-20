import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as api from "./utils/API"
export default class App extends Component {
  state = {

  }
  componentDidMount() {
    // api.storeDecks()
  }

  render() {
    // api.createDeck('test')
    // api.addCardToDeck('test', "What is your name?", "Abdulrahman")
    // api.getDecks()
    //   .then(() => api.removeDeck('JavaScript'))
    //   .then(() => api.getDecks())
    // .then(() => console.log("done removing"))


    return (
      <View style={styles.container} >
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
