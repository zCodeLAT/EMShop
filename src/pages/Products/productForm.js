import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from  '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { ref, push } from '@firebase/database';
import { withRouter } from 'react-router';
import { database, storage } from '../../config/firebaseConfig';
import { Input } from '@mui/material';
import { ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';

const ProductForm = (props) => {
    const [product, setProduct] = useState({
        sku: '',
        description: '',
        price: '',
        stock:'',
        image:''
    })

    const [image, setImage] = useState(null); //aqui almacena info del archivo seleccionado

    const handleChange = (e) => {
        setProduct({
            ...product, //... todos los elementos de customers
            [e.target.name]: e.target.value, //extrae name de cuadro de texto y luego su value
        });
    }

    const handleImage = (e) => {
        if(!e.target.files[0]) return; //en caso q no haya archivo seleccionado 

        const file = e.target.files[0];
        setImage({ //cambiamos el estado de setImage
            type: file.type.split('/')[1], //extrae extension de la imagen
            file
        })
    }

    const saveProduct = (item) => {
        push(ref(database, '/products'), item)
        .then(()=>{
            props.history.push('/productos');
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //evitamos q el form se envie

        if (image) { //validamos si hay img selected
            const imageName = `img_${Date.now()}.${image.type}` //nombre de img tipo img_84344.jpg
            const imageRef = storageRef(storage, `/products/${imageName}`);
            uploadBytes( //funcion para cargar el archivo
                storageRef(imageRef), //generamos nueva ref. Antes (storage, imageRef)
                image.file //pasamos el valor/archivo
            )
            .then(()=>{ //una vez que obtenemos respuesta positiva
                //guardar el producto
                //obtener URL del archivo guardado
                getDownloadURL(imageRef)
                .then((url)=>{
                    setProduct({
                        ...product, 
                        image:url
                    });
                    saveProduct({...product, image: url});
                },
                (error)=>{
                    console.log(error);
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        }
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
                            name='sku'
                            required
                            fullWidth
                            label='Sku'
                            value={product.sku}
                            onChange={handleChange}
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            name='description'
                            required
                            fullWidth
                            label='Descripcion'
                            value={product.description}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            name='stock'
                            required
                            fullWidth
                            label='Existencias'
                            value={product.stock}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            name='price'
                            required
                            fullWidth
                            label='Precio'
                            value={product.price}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                            type='file'
                            accept='image'
                            name='productImage'
                            id='productImage' //id asocia el boton "imagen de producto " al input
                            onChange={handleImage}
                            style={{width: '1px'}} //para ocultar boton por defecto
                            />
                            <label htmlFor='productImage'>
                                <Button variant='contained' component='span' style={{marginLeft:'-1px'}}>
                                    Imagen de producto
                                </Button>
                                {/*en caso q image tenga un valor renderiza nuevo span con datos*/}
                                {image && (<span>
                                    {image.file.name}
                                </span>)}
                            </label>
                        </Grid>
                        <Grid item xs={12} sx={{m:5, textAlign:'center'}}>
                        <Button type= 'submit' variant="contained" startIcon={<SaveIcon />}>
                        Guardar producto
                        </Button>
                        </Grid>
                </Grid>
            </Grid>
        </Paper>
        )
}

export default withRouter(ProductForm);