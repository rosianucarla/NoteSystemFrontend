import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Note() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[content,setContent]=useState('')
    const[notes,setNotes]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const note={name,content}
    console.log(note)
    fetch("http://localhost:8080/note/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(note)

  }).then(()=>{
    console.log("New Notes added")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/note/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setNotes(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Note</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Note Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Note Content" variant="outlined" fullWidth
      value={content}
      onChange={(e)=>setcontent(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Notes</h1>

    <Paper elevation={3} style={paperStyle}>

      {notes.map(note=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={note.id}>
         Id:{note.id}<br/>
         Name:{note.name}<br/>
         Content:{note.content}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}
