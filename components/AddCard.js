import React, { Component } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue } from '../utils/colors'
import { addCardToDeck } from "../utils/API"
import { KeyboardAvoidingView } from 'react-native';

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    handleQuestionChange = (text) => {
        this.setState(() => ({
            question: text
        }))
    }

    handleAnswerChange = (text) => {
        this.setState(() => ({
            answer: text
        }))
    }

    handleSubmitCard = () => {
        const { question, answer } = this.state
        const card = { question, answer }
        const title = this.props.navigation.state.params.title

        if (question === '' || answer === '') {
            alert(
                "Empty Fields, You need to fill both fields!"
            )
        } else {
            addCardToDeck(title, question, answer)
                .then((result) => {
                    if (result)
                        this.props.navigation.goBack()
                    else alert("The question already exists")
                }
                )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={this.state.question}
                        style={styles.input}
                        placeholder='Question'
                        onChangeText={this.handleQuestionChange} />
                    <TextInput
                        value={this.state.answer}
                        style={styles.input}
                        placeholder='Answer'
                        onChangeText={this.handleAnswerChange}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSubmitCard}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default AddCard

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {
        marginTop: 30,
    },
    input: {
        marginHorizontal: 30,
        marginBottom: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: blue
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
    buttonText: {
        fontSize: 18,
        color: 'white',
    }
})