import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Register from './Component/Register'
import Login from './Component/Login'
import LoadContextProvider from './Context/LoadContext';
import Dashboard from './Component/Dashboard'

const App = () => {
    return (
        <LoadContextProvider>    
         <BrowserRouter>
             <Switch>
                 <Route path="/register" component={Register}/>
                 <Route path="/login" component={Login}/>
                 <Route path="/dashboard" component={Dashboard}/>
             </Switch>
         </BrowserRouter>
         </LoadContextProvider>
    );
}
 
export default App;
    