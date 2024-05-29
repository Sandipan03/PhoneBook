import React from 'react'
import './contact.css'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons'
function Contact({name,phno,delete_contact,update_contact}) {
  const [updateOpen, setUpdateOpen] = useState(false)
  const [newName, setNewName] = useState(name)
  const [newNo, setNewNo] = useState(phno)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDelete = () => {
    delete_contact(phno);
    handleClose();
  }
  const handleAddContact = () => {
    update_contact(phno,newNo,newName);
    setUpdateOpen(false);
  }
  return (
    <>
    <div className="contacts">
    <Avatar>{name.charAt(0)}</Avatar>
      <h4>{name}</h4>
      <span id='phone'>{phno}</span>
      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={()=>{setUpdateOpen(true);handleClose();}}><span className='options'>Update</span>   <FontAwesomeIcon icon={faPenToSquare} /></MenuItem>
        
        <MenuItem onClick={handleDelete}><span className='options'>Delete</span> <FontAwesomeIcon icon={faTrash} /></MenuItem>
      </Menu>
    </div>
     
    </div>
    {updateOpen?(
          <div className="addForm">
            
         
          <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch',display:"flex",padding:"10px"},
      }}
      noValidate
      autoComplete="on"
    >
       <h3>Update Contact</h3>
      {/* <TextField id="filled-basic" label="Name" variant="filled" value={phname} onChange={(e)=>setPhname(e.target.value)} /> */}
      <input type="text" placeholder='Name' className='input_field' value={newName} onChange={(e)=>setNewName(e.target.value)} />
      <input type="text" placeholder='Phone No.' className='input_field' value={newNo} onChange={(e)=>setNewNo(e.target.value)} />
      {/* <TextField id="filled-basic" label="Phone No." variant="filled" value={phno} onChange={(e)=>setPhno(e.target.value)} /> */}
      <Box textAlign='right'>
          <Button variant="outlined" sx={{mr:"15px",height:"45px",width:"130px",mt:"25px"}} onClick={()=>{setUpdateOpen(false);setNewName(name);setNewNo(phno)}}>Cancel</Button>
      <Button variant="contained" sx={{mr:"15px",height:"45px",width:"130px",mt:"25px"}} onClick={handleAddContact}>Update</Button>
      </Box>
    </Box>
          
          </div>
        ):(
          <></>
      )}
    </>
  )
}

export default Contact