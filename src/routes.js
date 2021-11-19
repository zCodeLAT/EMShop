import { Route, Switch } from 'react-router-dom';

//pages
import Products from './pages/Products';
import productForm from './pages/Products/productForm';
import Customers from './pages/Customers';
import CustomerForm from './pages/Customers/customerForm';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Customers} /> 
        <Route exact path='/clientes' component={Customers} />
        <Route exact path='/clientes/agregar' component={CustomerForm} />
        <Route exact path='/productos' component={Products} />
        <Route exact path='/productos/agregar' component={productForm} />
    </Switch>   
);

export default Routes;