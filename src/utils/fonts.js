import {useFonts} from 'expo-font'

export function fonts() {
    const [fontsLoaded] = useFonts({
        'Algerian': require('../assets/fonts/Algerian.ttf'),
        'RubikBubbles-Regular' : require('../assets/fonts/RubikBubbles-Regular.ttf')
    })
}