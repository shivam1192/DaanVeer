import React ,{useContext }from 'react';
import LoadContextProvider from './Context/LoadContext';
import AuthContextProvider from './Context/AuthContext';
import Refresh from './Refresh'
const App = () => {

    return (
        <LoadContextProvider> 
            <AuthContextProvider>  
                <Refresh/>
         </AuthContextProvider>
         </LoadContextProvider>

       
    );
}
 
export default App;
    