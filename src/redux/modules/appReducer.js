export const HELLO_WORLD = 'HELLO_WORLD';

const initialState = { appName: 'React-Redux-Complete' }

export default function(state = initialState, action) {
    switch (action.type) {
        case HELLO_WORLD:
        default:
            return state;
    }
}