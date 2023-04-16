import { createContext, useReducer } from 'react'
import reducer, { initialState } from '../../reducers/reducer'
export const themeProvider = createContext()

const ProviderTheme = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const ThemeProvider = themeProvider.Provider
    
    return (
        <ThemeProvider value={[state, dispatch]}>
            {children}
        </ThemeProvider>
    )
}

export default ProviderTheme
