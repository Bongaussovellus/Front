import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { DatePicker, LocalizationProvider } from "@mui/lab"
import DateFnsUtils from "@date-io/date-fns"
import fiLocale from 'date-fns/locale/fi';
import CreateIcon from "@mui/icons-material/Create"

function AddRegistry() {
    
    const [spot, setValues] = useState ({
      registernumber: '', 
      location: '',
      date: new Date()
    })

    const [text, setText] = useState('')
    
    const addRegisterNumber = () => {
        let date = spot.date.getFullYear() + '-' + (spot.date.getMonth() + 1) +
        '-' + spot.date.getDate()
        const formData = new FormData
        formData.append('registernumber', spot.registernumber)
        formData.append('location', spot.location)
        formData.append('date', date)
    }

    const change = (e) => {
        setValues({
            ...spot,
            [e.target.name]: e.target.value
        })
    }

    const changeDate = (e) => {
        setValues({
            ...spot,
            date: e
        })

        setText('')
    }

    return(
        <Box>
            <Paper sx={{ padding: '10px', margin: '10px' }}>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch'} }}>
                        <TextField
                            required
                            fullWidth
                            label='Cars register number'
                            name='registernumber'
                            value={spot.registernumber}
                            onChange={(e) => change(e)}
                        />
                        <TextField
                            required
                            fullWidth
                            label='Spot location'
                            name='location'
                            value={spot.location}
                            onChange={(e) => change(e)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} utils={ DateFnsUtils } locale= { fiLocale }>
                            <DatePicker
                                label='Date spotted'
                                name='date'
                                value={spot.date}
                                onChange={(e) => changeDate(e)}
                                renderInput={(params) => (
                                    <TextField {...params} required fullWidth />
                                )}
                            />
                        </LocalizationProvider> 
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                        <Button
                            onClick={(e) => addRegisterNumber(e)}
                            variant="contained"
                            sx={{ marginRight: 3 }}
                            startIcon={<CreateIcon />}
                        >
                            Add
                        </Button>
                    </Box>
                    <Typography sx={{ marginTop: 3 }}>{text}</Typography>
            </Paper>
        </Box>
    )
}

export default AddRegistry;