import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

const draweWidth = 280;
export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}} className='animate__animated animate__fadeIn animate__faster'>
      <NavBar draweWidth={draweWidth}/>
       <SideBar draweWidth={draweWidth}/>
       <Box 
          component='main'
          sx={{flexGrow:1,p:4}}
        >
          <Toolbar/>
          {children}

       </Box>
    </Box>
  )
}
