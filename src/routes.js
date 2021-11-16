import { Route, Switch } from 'react-router-dom';

//pages
import Customers from './pages/Customers';
const Routes = () => (
    <Switch>
        <Route exact path='/' component={Customers} /> 
        <Route exact path='/clientes' component={Customers} />
        <Route exact path='/clientes/agregar' component={Customers} />
    </Switch>   
);

export default Routes;