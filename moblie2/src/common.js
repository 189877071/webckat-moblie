import { Dimensions } from 'react-native'

export const r = (() => {
    const b = Dimensions.get('window').width / 1080;
    return w => w * b;
})();