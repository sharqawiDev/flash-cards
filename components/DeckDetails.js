import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { blue, red } from '../utils/colors'
import { removeDeck, getDeck } from "../utils/API"
import { NavigationEvents } from 'react-navigation';
export default class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('title'),
        };
    };

    state = {
        deck: {
            title: "",
            questions: []
        },
    }



    componentDidMount() {
        const title = this.props.navigation.state.params.title;
        getDeck(title).then((deck) => this.setState({ deck }))
    }
    refresh = () => {
        const title = this.props.navigation.state.params.title;
        getDeck(title).then((deck) => this.setState({ deck }))
    }


    handleRemoveDeck = (title) => {
        removeDeck(title).then(() => this.props.navigation.goBack())
    }


    render() {
        const { deck } = this.state;
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={this.refresh} />
                <View style={styles.Box}>
                    <Text style={styles.title}>{deck.title} Deck</Text>

                    <Text style={styles.subTitle}>{deck.questions.length} cards</Text>


                </View>
                <TouchableOpacity style={styles.button}
                    onPress=
                    {
                        () => this.props.navigation.navigate(
                            "AddCard", { title: deck.title }
                        )
                    }
                >
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress=
                    {
                        () => {
                            deck.questions.length === 0
                                ? alert("You can't start a quiz if you have no questions")
                                : this.props.navigation.navigate(
                                    "Quiz", { questions: deck.questions }
                                )
                        }
                    } >
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteBtn]}
                    onPress={() => this.handleRemoveDeck(deck["title"])}>
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