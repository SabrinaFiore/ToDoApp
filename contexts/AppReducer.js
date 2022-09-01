export const initialState = {
    id: '0', 
    message: '', 
    date: '', 
    button: '', 
    displayRow: false
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Add': {
            // id: '0', message: '', date: '', button: '', displayRow: false
            return {
                ...items
            }
        }
        case 'Delete': {
            
        }
    }
}