import React, { useEffect, useState } from "react";
import { onValue, ref, remove } from '@firebase/database';
import { database } from '../../config/firebaseConfig';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);

    const handleDelete = (id)=> {
      console.log(id);
      remove(ref(database, `/products/${id}`))
      .then(()=>{
        alert('Producto eliminado');
        renderProducts();
      })
    };
    
    const renderProducts = () => {
      return products.map((item)=>(
         <ProductCard key={item.id} product={item} onDelete={handleDelete}/>
      ))
    }

    useEffect(()=> {     
      let isMounted = true; 
      if(isMounted) {        //verif. si if va dentro de onValue                  
      onValue(  
          ref(database,'/products'),
          (snapshot)=> {
              const productList =[];
              snapshot.forEach(item => {
                  const productItem = {
                      id: item.key,
                      ...item.val()
                  };
                  productList.push(productItem);
              });
              setProducts(productList); //setea STATE
          },
          (error)=> { //catch en caso de error
          console.log(error);
          
      }
      );
      }
      return () => {
        
        isMounted = false;
      };
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
            <Grid item xs={12} sx={{display:'flex', flexWrap: 'wrap'}}>
                {renderProducts()}
            </Grid>
          </Grid>
        </Paper>
      );
} 

export default Products;