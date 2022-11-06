import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote,savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";



export const startNewNot = ()=>{
    return async(dispatch,getState)=>{

        dispatch(savingNewNote());

        const {uid} = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        }

        const newDocRef = doc(collection(FirebaseDB,`${uid}/journal/notes`));

        await setDoc(newDocRef,newNote);

        newNote.id= newDocRef.id

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

        //dispatch newNote
        //dispatch activarNote
    }
}

export const startLoadingNotes = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth;

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSaveNote=()=>{
    return async(dispatch,getState)=>{

        dispatch(setSaving());
        const {uid} = getState().auth
        const {active:note}=getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);

        await setDoc(docRef,noteToFireStore,{merge:true})

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files=[])=>{

    return async(dispatch)=>{
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));
    }

}

export const startDeletingNote = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth
        const {active:note}=getState().journal;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)

        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))


    }
}