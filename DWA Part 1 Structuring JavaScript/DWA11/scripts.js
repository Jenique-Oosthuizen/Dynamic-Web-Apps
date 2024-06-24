import { getState, update } from "./store.js"
import { add, subtract, reset } from "./actions.js"

// Log the initial state
console.log(getState()) // Should log { count: 0 }

/**
 * Dispatch ADD action
 */
update(add)
console.log(getState()) // Should log { count: 1 }

/**
 * Dispatch another ADD action
 */
update(add)
console.log(getState()) // Should log { count: 2 }

/**
 * Dispatch SUBTRACT action
 */
update(subtract)
console.log(getState()) // Should log { count: 1 }

/**
 * Dispatch RESET action
 */
update(reset)
console.log(getState()) // Should log { count: 0 }