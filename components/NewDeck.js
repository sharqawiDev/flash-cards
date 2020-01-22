import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { blue } from "../utils/colors"
import { addDeck } from '../utils/API';

export default class NewDeck extends Component {

    state = {
        input: ""
    }
    submitDeck = () => {
        if (this.state.input == '') {
            alert("You must enter a deck title")
        } else {
            addDeck(this.state.input)
                .then((result) => alert(result.message))
                .then(() => {
                    const title = this.state.input;
                    this.setState({ input: "" })
                    this.props.navigation.navigate("Deck Details", {
                        title
                    })
                })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.input}
                    onChangeText={(value) => {
                        this.setState({ input: value })
                    }}
                    placeholder='Deck Title' />
                <TouchableOpacity style={styles.button} onPress={this.submitDeck}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea'
    },
    text: {
        fontSize: 22,
        color: '#455356',
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 30,
    },
    input: {
        margin: 30,
        padding: 10,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    button: {
        backgroundColor: blue,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 6,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    }

})
