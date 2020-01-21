import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import Constants from 'expo-constants';

const DATA = [
    {
        title: 'React',
        questions: [
            {
                id: 3,
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                id: 4,
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
];

export default class DeckList extends Component {
    state = {}
    componentDidMount() {

    }
    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => this.props.navigation.navigate("Deck Details")}
                        >
                            <View style={styles.Deckcontainer}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {item.questions.length} cards
                        </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.title}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    box: {
        flex: 1,
        height: 200,
        maxWidth: '45%',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        margin: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 6,
    },
    Deckcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#455356',
    },
    subTitle: {
        fontSize: 14,
        color: '#838c8e',
    }
});
