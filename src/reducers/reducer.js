import { THEME_DARK, THEME_LIGHT } from './actions'

const initialState = {
    currentTheme: sessionStorage.getItem('currentTheme') ?? 'light',
}

const reducer = (state, action) => {
    switch (action.type) {
        case THEME_LIGHT:
            return {
                ...state,
                currentTheme: action.payload
            }

        case THEME_DARK:
            return {
                ...state,
                currentTheme: action.payload
            }
        default:
            return state
    }
}

export default reducer
export { initialState }