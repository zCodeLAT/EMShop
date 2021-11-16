import { Route, Switch } from 'react-router-dom';

//pages
import Customers from './pages/Customers';
import CustomerForm from './pages/Customers/customerForm';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Customers} /> 
        <Route exact path='/clientes' component={Customers} />
        <Route exact path='/clientes/agregar' component={CustomerForm} />
    </Switch>   
);

export default Routes;