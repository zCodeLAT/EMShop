import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { onValue, ref } from '@firebase/database';
import { database } from '../../config/firebaseConfig';

const columns = [
  {
    field: 'fullName',
    headerName: 'Nombre',
    sortable: false,
    width: 250,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'name') || ''} ${
        params.getValue(params.id, 'lastname') || ''
      }`,
  },
  {
      field: 'email',
      headerName: 'Email',
      width: '220'
  },
  {
    field: 'phone',
    headerName: 'Telefono',
    width: '220'
},
{   
    field: 'company',
    headerName: 'Empresa',
    width: '220'
}
];

const Customers = () => {

    const [customers, setCustomers] = useState([]); //inicializa state "customers" con funcion setCustomers
    useEffect(()=> {                                
        onValue(  
            ref(database,'/customers'),
            (snapshot)=> {
                const customerList =[];
                snapshot.forEach(item => {
                    const customerItem = {
                        id: item.key,
                        ...item.val()
                    };
                    customerList.push(customerItem);
                });

                setCustomers(customerList); //setea STATE

            },
            (error)=> { //catch en caso de error
            console.log(error);
        }
        );
    }, []);
    return (
    <Paper
      sx={{
        // prop custom style de MUI
        p: 3, //p de padding
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <h3 sx={{ m: 0 }}>Clientes</h3>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            LinkComponent={Link}
            to="/clientes/agregar"
            startIcon={<DeleteIcon />}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={customers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Customers;
