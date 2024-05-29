import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPlus,faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import {db,auth} from './firebase-config.js'
import Contact from './components/contact.jsx'
import { getFirestore , collection,onSnapshot,orderBy,query,doc,setDoc,updateDoc} from "firebase/firestore";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { set } from 'firebase/database';
function App() {
 const [signupOpen, setSignupOpen] = useState(false)
 const [loginOpen, setLoginOpen] = useState(false)
 const [email, setEmail] = useState('')
 const [name, setName] = useState('')
 const [password, setPassword] = useState('')
 const [phname, setPhname] = useState('')
  const [phno, setPhno] = useState('')
 const [confpassword, setConfpassword] = useState('')
 const [currentuser, setCurrentuser] = useState('')
 const [userdata, setUserdata] = useState({})
 const [contacts, setContacts] = useState([])
 const [addOpen, setaddOpen] = useState(false)
 const [alertlogin, setAlertlogin] = useState(false)
const [errormsg, setErrormsg] = useState('')

 const handleSignupOpen = () => {
    if(signupOpen===false){
    setSignupOpen(true)}
    else{
      setSignupOpen(false)
    }
 }
 const handleLoginOpen = () => {
    if(loginOpen===false){
    setLoginOpen(true)}
    else{
      setLoginOpen(false)
    }
 }
  const handleClose = () => {
    setSignupOpen(false)
    setLoginOpen(false)
    setEmail('');
    setPassword('');
    setConfpassword('');
    setName('');}
  const handleLogout = () => {
    auth.signOut();
    setCurrentuser('');
    setSignupOpen(false);
    setLoginOpen(false);
  }
  const  handleAddContact = (e)=>{
    e.preventDefault();
    const newContacts=[...contacts,{cname:phname,cno:phno}];
    updateDoc(doc(db, "users", currentuser), {contacts:newContacts});
    setPhname('');
    setPhno('');
    setaddOpen(false);
  }
  const loginUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password)
    .then((authUser) => {
      const uid=authUser.user.uid;
      // console.log("UID: ",uid);
      setCurrentuser(uid);
      // console.log("Current User: ",currentuser);
      // console.log(currentuser);
      // console.log(uid);
      setEmail('');
    setPassword('');
    })
    .catch((error)=>{
      // alert(error.message);
      setErrormsg(error.message);
      setAlertlogin(true);
      setTimeout(()=>{setAlertlogin(false)},2500);
    });
    
  }
  const signupUser = (e) => {
    e.preventDefault()
    if (password === confpassword){
      createUserWithEmailAndPassword(auth, email, password)
  .then((authUser) => {
    const uid=authUser.user.uid;
    setCurrentuser(uid);
    // console.log("UID: ",uid);
      // console.log("Current User: ",currentuser);
    // console.log(currentuser);
    const userRef=doc(db,"users",uid);
    setDoc(userRef,{
      name:name,
      email:email,
      password:password,
      contacts:[]});
      setEmail('');
  setPassword('');
  setConfpassword('');
  setName('');
  })
  .catch((error) => {
    setErrormsg(error.message);
      setAlertlogin(true);
      setTimeout(()=>{setAlertlogin(false)},2500);
  });
  
    }
    else{
      setErrormsg('Password and its confirm do not match');
      setAlertlogin(true);
      setTimeout(()=>{setAlertlogin(false)},2500);
    }
  }
  // useEffect(()=>{ 
  //   const unsubscribe= onAuthStateChanged(auth,(authUser)=>{ 
  //     if(authUser){
  //       setUser(authUser);
  //       // setCurrentuser(authUser.uid);
  //       // console.log(authUser);
  //     }
  //     else{
  //       setUser(null);
  //     }
  //   })
  //   return ()=>{
  //     unsubscribe();
  //   }
  // }, [currentuser]) ; 
  const delete_contact = (phno) => {
    const newContacts=contacts.filter((contact)=>contact.cno!==phno);
    updateDoc(doc(db, "users", currentuser), {contacts:newContacts});
  }
  const update_contact = (oldNo,newNo,newName) => {
    const newContacts=contacts.map((contact)=>contact.cno===oldNo?{cname:newName,cno:newNo}:contact);
    updateDoc(doc(db, "users", currentuser), {contacts:newContacts});
  
  }
  useEffect(()=>{
    if (currentuser){
      // console.log(currentuser);
    onSnapshot(doc(db, "users", currentuser), (doc) => {
      const newobj=doc.data();
      setUserdata(newobj);
      setContacts(newobj['contacts']);
      // contacts.sort((a,b)=>a.cname.localeCompare(b.cname));
      // console.log("Current data: ",newobj);
  })}
 
  }, [currentuser]) ;
  return (
    <div className='body'>
      {alertlogin?(
        <Alert severity="error" sx={{width:"fit-content",mb:3}}>{errormsg}</Alert>
      ):(
        <span></span>
      )}
      <div className='header'>
        <h1><span className='header_color'>P</span>hone<span className='header_color'>B</span>ook</h1></div>
      {currentuser?(
        <div className="content">
          <div className="header">
            <h2>Hello {userdata.name}</h2>
          </div>
        <Button variant="outlined" sx={{mb:"15px",mt:"20px",height:"50px",width:"120px"}} onClick={handleLogout}>Log out<FontAwesomeIcon icon={faRightToBracket} /></Button>
        <h2>Your Contacts</h2>
        {addOpen?(
          <div className="addForm">
            
         
          <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch',display:"flex",padding:"10px"},
      }}
      noValidate
      autoComplete="on"
    >
       <h3>New Contact</h3>
      {/* <TextField id="filled-basic" label="Name" variant="filled" value={phname} onChange={(e)=>setPhname(e.target.value)} /> */}
      <input type="text" placeholder='Name' className='input_field' value={phname} onChange={(e)=>setPhname(e.target.value)} />
      <input type="text" placeholder='Phone No.' className='input_field' value={phno} onChange={(e)=>setPhno(e.target.value)} />
      {/* <TextField id="filled-basic" label="Phone No." variant="filled" value={phno} onChange={(e)=>setPhno(e.target.value)} /> */}
      <Box textAlign='right'>
          <Button variant="outlined" sx={{mr:"15px",height:"45px",width:"130px",mt:"25px"}} onClick={()=>{setaddOpen(false);setPhname('');setPhno('')}}>Cancel</Button>
      <Button variant="contained" sx={{mr:"15px",height:"45px",width:"130px",mt:"25px"}} onClick={handleAddContact}>Add</Button>
      </Box>
    </Box>
          
          </div>
        ):(
        <Box textAlign='right'>
        <Button variant="contained" sx={{mb:"25px",mt:"20px",height:"50px",width:"120px"}} onClick={()=>{setaddOpen(true)}}>Add<FontAwesomeIcon icon={faUserPlus} /></Button>
        
        </Box>
      )}
        {
    contacts.length===0?(
      <div>
      <h3>No contacts to display</h3>
      </div>
    ):(
      <div>
        
        
        {
          
    contacts.map(({cname,cno})=>(
      // console.log(post),
      
      <Contact key={cname} name={cname} phno={cno} delete_contact={delete_contact} update_contact={update_contact}/>
    ))
  }
  </div>)
  }
        </div>
      ):(
      <div className="buttons">
      
      {
        signupOpen?(
          <div >
            <Box 
      component="form"
      sx={{
        '& > :not(style)': {  width: '25ch', display:"flex",padding:"10px" },
      }}
      noValidate
      autoComplete="off"
    >
      {/* <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/> */}
      <input type="text" placeholder='Name' className='input_field' value={name} onChange={(e)=>setName(e.target.value)} />
      {/* <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/> */}
      <input type="text" placeholder='Email' className='input_field' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder='Password' className='input_field' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <input type="password" placeholder='Confirm Password' className='input_field' value={confpassword} onChange={(e)=>setConfpassword(e.target.value)} />
      {/* <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} type='password'/> */}
      {/* <TextField id="outlined-basic" label="Confirm Password" variant="outlined" value={confpassword} onChange={(e)=>setConfpassword(e.target.value)} type='password'/> */}

    </Box>
    <Box textAlign='right'>
    <Button variant="contained" sx={{mt:"25px",height:"50px",width:"110px"}} onClick={signupUser}>Sign Up</Button> <br />
            </Box>
            <Button variant="outlined" sx={{mt:"10px",height:"50px",width:"110px"}} onClick={handleClose}>&lt;&#x3C; Back</Button>
          </div>
        ):loginOpen?(
          <div >
          <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch',display:"flex",padding:"10px"},
      }}
      noValidate
      autoComplete="off"
    >
      {/* <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}  /> */}
      <input type="text" placeholder='Email' className='input_field' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder='Password' className='input_field' value={password} onChange={(e)=>setPassword(e.target.value)} />
      {/* <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" /> */}
            
      
      
    </Box>
    <Box textAlign='right'>
    <Button variant="contained" sx={{mt:"25px",height:"50px",width:"110px"}} onClick={loginUser}>Log In</Button> <br />
            </Box>
          <Button variant="outlined" sx={{mt:"10px",height:"50px",width:"110px"}} onClick={handleClose}>&lt;&#x3C; Back</Button>
          </div>
        ):(
          <div>
          <Button variant="contained" sx={{mr:"15px",height:"50px",width:"130px"}} onClick={handleSignupOpen}>Sign Up</Button>
          <Button variant="outlined" sx={{mr:"15px",height:"50px",width:"130px"}} onClick={handleLoginOpen}>Log In</Button>
          <h3>Please login or signup to continue</h3>
          </div>
        )
      }
       
       {/* {console.log("Current User outside: ",currentuser)} */}
       {/* {console.log(userdata['contacts'])} */}
      </div>
      )}
    </div>
  )
}

export default App
