let decks = {
    React: {
        title: 'React',
        questions: [
            {
                id: IDGenerator(),
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                id: IDGenerator(),
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                id: IDGenerator(),
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};
function IDGenerator() { return Math.random().toString(36).substr(-8) }
const DATA_KEY = "DECKS";
export { decks, DATA_KEY, IDGenerator };