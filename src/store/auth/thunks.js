import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication =()=>{
    return (dispatch)=>{

        dispatch(checkingCredentials());
        
    }
}

export const startGoogleSingIn=()=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
        const result = await singInWithGoogle();

        if(!result.ok) return dispatch(logout());

        dispatch(login(result))
        

    }
}

export const startCreatingUserWithEmailPassword =({email,password,displayName})=>{
    return async(dispatch)=>{

        dispatch(checkingCredentials());

        const {ok,errorMessage,photoURL,uid} = await registerUserWithEmailPassword({email,password,displayName})

         if(!ok) return dispatch(logout({errorMessage}))   

        dispatch(login({uid,displayName,email,photoURL}));
    }
}

export const startLoginWithEmailPassword = ({email,password})=>{

    return async(dispatch)=>{

        dispatch(checkingCredentials());
        const {ok,errorMessage,photoURL,uid,displayName} = await loginWithEmailPassword({email,password});

        if(!ok) return dispatch(logout({errorMessage}));
        
        dispatch(login({uid,email,photoURL,displayName}))
    }
}

export const startLogout = ()=>{
    return async(dispatch)=>{
        
        try {
            await logoutFirebase();
            dispatch(clearNotesLogout())
            dispatch(logout({}));
        } catch (error) {
            
        }

    }
}

