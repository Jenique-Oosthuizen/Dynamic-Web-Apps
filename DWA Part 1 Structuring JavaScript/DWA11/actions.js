/**
 * Creates a new state with the count incremented by 1.
 * @param {State} state - The current state
 * @returns {State} The new state
 */
export const add = (state) => {
    return {
        ...state,
        count: state.count + 1
    }
}

/**
 * Creates a new state with the count decremented by 1.
 * @param {State} state - The current state
 * @returns {State} The new state
 */
export const subtract = (state) => {
    return {
        ...state,
        count: state.count - 1
    }
}

/**
 * Creates a new state with the count reset to 0.
 * @param {State} state - The current state
 * @returns {State} The new state
 */
export const reset = (state) => {
    return {
        ...state,
        count: 0
    }
}