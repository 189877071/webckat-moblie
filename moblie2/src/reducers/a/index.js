
function a(state={}, action) {
    switch(action.type) {
        case 'AAA':
            return {
                ...state,
                name: action.name``
            }
    }
    return state
}

export default a;