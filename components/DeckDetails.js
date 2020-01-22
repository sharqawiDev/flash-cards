import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray, blue, red } from '../utils/colors'
export default class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('title'),
        };
    };

    state = {
        deck: this.props.navigation.state.params.deck
    }

    render() {
        const { deck } = this.state;
        console.log(deck)
        return (
            <View style={styles.container}>
                <View style={styles.Box}>
                    <Text style={styles.title}>{deck.title} Deck</Text>
                    <Text style={styles.subTitle}>{deck.questions.length} cards</Text>
                </View>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteBtn]} >
                    <Text style={styles.buttonText}>Remove Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Box: {
        borderRadius: 50,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 75,
        marginHorizontal: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#455356',
    },
    subTitle: {
        fontSize: 14,
        color: '#838c8e',
    },
    button: {
        backgroundColor: blue,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 6,
    },
    deleteBtn: {
        backgroundColor: red,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
})