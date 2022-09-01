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
            console.log("ADD ACTION", action.value);
            return action.value;
        }
        case 'Delete': {
            console.log("DELETE ACTION", action);
            return action.value;
        }
    }
}