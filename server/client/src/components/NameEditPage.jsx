import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { UserContext } from '../Context/Context';
import { useContext } from 'react';
import {baseUrl} from '../url'
import axios from 'axios';

function NameEditPage() {

    const [name,setName]=useState('')
    const {setNameEdit } = useContext(UserContext)
    const data={
        name:name,
    }

    const handleName=()=>{
        axios.post(`${baseUrl}/nameUpdate`, data, { withCredentials: true })
        setNameEdit(false)
        setName("")
    }


    return (
        <Box >

            <TextField
                id="outlined-textarea"
                label="Edit your name"
                placeholder="enter your name"
                multiline
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Box display="flex" ml="5rem" mt="0.5rem" gap="1rem">
                <Button onClick={e=>setNameEdit(false)}>Cancel</Button>
                <Button onClick={handleName}>save</Button>
            </Box>
        </Box>
    )
}

export default NameEditPage
