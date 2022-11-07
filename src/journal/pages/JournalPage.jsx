import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNot } from '../../store/journal'



export const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving,active} = useSelector(state => state.journal);
  const onClickNewNote = ()=>{
    dispatch(startNewNot())
  }
  return (
    <>
    <JournalLayout>
      {
        active == null
       ?<NothingSelectedView/>
       :<NoteView/> 
      }
      
      <IconButton
        size='large'
        sx={{
          color:'white',
          backgroundColor:'error.main',
          ':hover':{backgroundColor:'error.main',opacity:0.9},
          position:'fixed',
          right:50,
          bottom:50
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
        >
        <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>
    </>
  )
}
