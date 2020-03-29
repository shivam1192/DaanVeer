import React ,{useContext }from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Register from './Component/Register'
import Login from './Component/Login'
import LoadContextProvider from './Context/LoadContext';
import Dashboard from './Component/Dashboard'
import AuthContextProvider from './Context/AuthContext';
import Refresh from './Refresh'
const App = () => {

    return (
        <LoadContextProvider> 
            <AuthContextProvider>  
                <Refresh>
         <BrowserRouter>
             <Switch>
                 <Route path="/register" component={Register}/>
                 <Route path="/login" component={Login}/>
                 <Route path="/dashboard" component={Dashboard}/>
             </Switch>
         </BrowserRouter>
         </Refresh>
         </AuthContextProvider>
         </LoadContextProvider>

       
    );
}
 
export default App;
    