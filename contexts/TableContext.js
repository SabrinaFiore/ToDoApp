import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { AppReducer, initialState } from './AppReducer';

const AppContext = createContext();

export function AppWrapper({children}) {
	const [state, dispatch] = useReducer(AppReducer, initialState)
	console.log("STATE FROM TableContext", state)

	const sharedState = useMemo(() => {
		return { state, dispatch }
	}, [state, dispatch])

	useEffect(() => {
		const data = window.localStorage.getItem('sf_toDoList')
		if (data) {
			dispatch({
				type: 'load_items',
				// value: JSON.parse(localStorage.getItem('sf_toDoList'))
				value: JSON.parse(data)
			})
		}
	}, [])

	useEffect(() => {
		if (state !== initialState) {
			window.localStorage.setItem('sf_toDoList', JSON.stringify(state))
		}
	}, [state])

	return (
		<AppContext.Provider value={sharedState}>
			{children}
		</AppContext.Provider>
	)
};

export function useAppContext() {
	return useContext(AppContext)
}