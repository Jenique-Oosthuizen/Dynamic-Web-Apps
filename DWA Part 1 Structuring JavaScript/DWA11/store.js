/**
 * @typedef {Object} State
 * @property {number} count - The current count value
 */

/**
 * The initial state of the store.
 * @type {State}
 */
const initialState = {
    count: 0
}

/**
 * An array to hold the states.
 * @type {State[]}
 */
export const states = [initialState]

/**
 * An array to hold the notifiers.
 * @type {Function[]}
 */
let notifiers = []

/**
 * Gets the current state.
 * @returns {State} The current state
 */
export const getState = () => {
    return states[0]
}

/**
 * Updates the state by applying an action.
 * @param {function(State): State} action - A function that takes the current state and returns the next state
 * @throws {Error} If the action is not a function
 */
export const update = (action) => {
    if (typeof action !== "function") {
        throw new Error("action is required to be a function")
    }

    const prev = Object.freeze({ ...states[0] })
    const next = Object.freeze({ ...action(prev) })

    const handler = (notify) => notify(prev, next)
    notifiers.forEach(handler)

    states.unshift(next)
}

/**
 * Subscribes a notifier to state changes.
 * @param {function(State, State): void} notify - A function to be called when the state changes
 * @returns {function(): void} A function to unsubscribe the notifier
 */
export const subscribe = (notify) => {
    notifiers.push(notify);

    const unsubscribe = () => {
        notifiers = notifiers.filter(current => current !== notify)
    }

    return unsubscribe
}