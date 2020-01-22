import { decks, DATA_KEY, IDGenerator } from "./_DATA"
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'NOTIFY'


export const storeDecks = async () => {
    try {
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(decks));
    } catch (error) {
        console.log(error)
    }
};

export const getDecks = async () => {
    try {
        const decks = await AsyncStorage.getItem(DATA_KEY);
        if (decks !== null) {
            // We have data!!
            return JSON.parse(decks);
        }
    } catch (error) {
        console.log(error)
    }
};
export const getDeck = async (title) => {
    try {
        const decks = await AsyncStorage.getItem(DATA_KEY);
        if (decks !== null) {
            // We have data!!
            return JSON.parse(decks)[title];
        }
    } catch (error) {
        console.log(error)
    }
};

export const addDeck = async (title) => {
    try {
        let decks = await AsyncStorage.getItem(DATA_KEY);
        decks = JSON.parse(decks)
        let message = "";
        let exist = false;
        Object.keys(decks).map(deckTitle => {
            if (deckTitle === title) {
                message = "Deck already exist"
                exist = true;
            }
        })

        if (!exist) {
            await AsyncStorage.mergeItem(DATA_KEY, JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            }))
            return { message: "Deck has been added successfully!", done: true }
        } else {
            return { message, done: false }
        }
    } catch (error) {
        console.log("createDeck error")
    }
};

export const addCardToDeck = async (deckTitle, question, answer) => {
    try {
        let decks = await AsyncStorage.getItem(DATA_KEY);
        decks = JSON.parse(decks)
        if (Object.keys(decks).length === 0) {
            console.log("there is no decks")
            return
        } else if (decks[deckTitle] === undefined) {
            console.log("there is no deck with this title")
            return;
        }
        let exist = false;
        decks[deckTitle].questions.map(Question => {
            if (Question.question.toLowerCase() === question.toLowerCase()) {
                console.log("question already exist!");
                exist = true;
            }

        })
        if (!exist) {
            decks[deckTitle].questions.push({ id: IDGenerator(), question, answer })
            await AsyncStorage.mergeItem(DATA_KEY, JSON.stringify(decks))
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log("addCardToDeck error")
    }
}

export const removeCardFromDeck = async (deckTitle, cardID) => {
    let decks = await AsyncStorage.getItem(DATA_KEY);
    decks = JSON.parse(decks)
    if (Object.keys(decks).length === 0) {
        console.log("there is no decks")
        return;
    } else if (decks[deckTitle] === undefined) {
        console.log("there is no deck with this title");
        return;
    }
    let removed = true;
    decks[deckTitle].questions.map(question => {
        const index = decks[deckTitle].questions.indexOf(question);
        if (cardID === question.id) {
            if (index > -1) {
                removed = false;
                decks[deckTitle].questions.splice(index, 1);
                AsyncStorage.mergeItem(DATA_KEY, JSON.stringify(decks));
            }
        }
    })
    if (removed) console.log("this question does not exist")
}

export const removeDeck = async (deckTitle) => {
    try {
        let decks = await AsyncStorage.getItem(DATA_KEY);
        decks = JSON.parse(decks)
        if (Object.keys(decks).length === 0) {
            console.log("there is no decks");
            return
        }
        let exist = false;
        Object.keys(decks).map(deck => {
            if (deckTitle.toLowerCase() === deck.toLowerCase()) {
                delete decks[deckTitle];
                exist = true;
            }
        })
        if (exist) {
            await AsyncStorage.setItem(DATA_KEY, JSON.stringify(decks))
        } else console.log("No deck with this name")

    } catch (error) {
        console.log(error)
    }

}

export const removeAllDecks = async () => {
    await AsyncStorage.removeItem(DATA_KEY);
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Take a quiz!',
        body: "👋 don't forget to take a quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate())
                            tomorrow.setHours(8)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}


