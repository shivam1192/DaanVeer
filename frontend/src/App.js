import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Register from './Component/Register'
import LoadContextProvider from './Context/LoadContext';


const App = () => {
    return (
        <LoadContextProvider>
         <BrowserRouter>
             <Switch>
                 <Route path="/register" component={Register}/>
             </Switch>
         </BrowserRouter>
         </LoadContextProvider>
    );
}
 
export default App;
    