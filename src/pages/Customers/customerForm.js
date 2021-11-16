import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from  '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { ref, push } from '@firebase/database';
import { withRouter } from 'react-router';
import { database } from '../../config/firebaseConfig';

const CustomerForm = (props) => {
    const [customer, setCustomer] = useState({
        name:'',
        lastname:'',
        email:'',
        phone:'',
        company:''
    })

    const handleChange = (e) => {
        setCustomer({
            ...customer, //... todos los elementos de customers
            [e.target.name]: e.target.value, //extrae name de cuadro de texto y luego su value
        });
    }
    const handleSubmit = (e) => { //se engarga de hacer el submit de los datos
        e.preventDefault();
        push(ref(database,'/customers'), customer)
        .then(()=>{
            //redireccionar a /clientes una vez cargado el cliente
            props.history.push('/clientes'); 
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
    <Paper
      sx={{
        // prop custom style de MUI
        p: 3, //p de padding
      }}
    >
        <Grid container spacing={2} component='form' onSubmit={handleSubmit}
            sx={{ mt: 3, justifyContent: 'center' }}
        >
            <Grid item container xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name='name'
                        required
                        fullWidth
                        label='Nombre'
                        value={customer.name}
                        onChange={handleChange}
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        name='lastname'
                        required
                        fullWidth
                        label='Apellido'
                        value={customer.lastname}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        name='email'
                        required
                        fullWidth
                        label='Email'
                        value={customer.email}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        name='phone'
                        required
                        fullWidth
                        label='Telefono'
                        value={customer.phone}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        name='company'
                        required
                        fullWidth
                        label='Empresa'
                        value={customer.company}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sx={{m:5, textAlign:'center'}}>
                    <Button type= 'submit' variant="contained" startIcon={<SaveIcon />}>
                    Guardar cliente
                    </Button>
                    </Grid>
            </Grid>
        </Grid>
    </Paper>
    )
}

export default withRouter(CustomerForm);