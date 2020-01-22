import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Constants from 'expo-constants';
import { getDecks } from "../utils/API"

export default class DeckList extends Component {
    state = {
        decks: {}
    }
    componentDidMount() {
        getDecks()
            .then((decks) => this.setState({ decks }))
    }

    refresh = () => {
        getDecks()
            .then((decks) => this.setState({ decks }))
    }

    render() {
        const { decks } = this.state;
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={() => this.refresh()} />
                {Object.keys(decks).length === 0
                    ? <View style={[styles.container, styles.noDecks]}>
                        <Text style={styles.title}>There is no Decks</Text>
                    </View>
                    : <FlatList
                        data={Object.keys(decks)}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    style={styles.box}
                                    onPress=
                                    {
                                        () => this.props.navigation.navigate(
                                            "Deck Details",
                                            {
                                                title: item,
                                                deck: decks[item],
                                            }
                                        )
                                    }
                                >

                                    <Text style={styles.title}>
                                        {decks[item].title}
                                    </Text>
                                    <Text style={styles.subTitle}>
                                        {decks[item].questions.length} cards
                            </Text>

                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item}
                    />
                }

            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    noDecks: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        margin: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 6,
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
