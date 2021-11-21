
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";


const Products = () => {
    return (
        <Paper
          sx={{
            // prop custom style de MUI
            p: 3, //p de padding
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <h3 sx={{ m: 0 }}>Productos</h3>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                LinkComponent={Link}
                to="/productos/agregar"
                startIcon={<AddIcon />}
              >
                Agregar
              </Button>
            </Grid>
            <Grid item xs={12}>
                Productos
            </Grid>
          </Grid>
        </Paper>
      );
}

export default Products;