import { useReducer, useEffect, createContext } from 'react'

const initialState = { user: null }

const Context = createContext();

const rootReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN':
            return { ...state, user: payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return { ...state }

    }
}

const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(rootReducer,initialState);

    useEffect(() => {
        dispatch({
          type: "LOGIN",
          payload: JSON.parse(window.localStorage.getItem("user")),
        });
      }, []);

    return (
        <>
            <Context.Provider value={{state,dispatch}}>
                {children}
            </Context.Provider>
        </>
    )
}

export {Context, Provider}