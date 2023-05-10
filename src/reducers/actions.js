const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

const themeDark = payload => {
    return {
        type: THEME_DARK,
        payload
    }
}
const themeLight = payload => {
    return {
        type: THEME_LIGHT,
        payload
    }
}


export {
    THEME_DARK,
    THEME_LIGHT,
    themeDark,
    themeLight
}