import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChangePassword from "./pages/ChangePassword";
import InfoUser from "./pages/InfoUser";
import ConfirmSuppression from "./pages/ConfirmSuppression";
import ConfirmReset from "./pages/ConfirmReset";
import Parameter from "./components/Parameter";
import UserEdit from "./pages/UserEdit";
import Claim from "./pages/Claim";
import Reclamations from "./pages/Reclamations";

import Header from "./components/Header";
import AddTechnician from "./pages/AddTechnician";
import UserCard from "./components/UserCard";
import UserList from "./pages/UserList";
import UserMoreDetails from "./pages/UserMoreDetails";
import ConfirmSuppAccount from "./pages/ConfirmSuppAccount";
import ReclamationsList from "./pages/ReclamationsList";
import InterventionsList from "./pages/InterventionsList";
import Admin from "./pages/Admin";
import AdminDetails from "./pages/AdminDetails";
import ParameterAdmin from "./pages/ParameterAdmin";
import AdminEdit from "./pages/AdminEdit";
import LogoutLink from "./components/LogoutLink";
import AddCategory from "./pages/AddCategory";
import AddFunction from "./pages/AddFunction";
import CategoryOptions from "./pages/CategoryOptions";
import CategoryEdit from "./pages/CategoryEdit";
import FunctionOptions from "./pages/FunctionOptions";
import FunctionEdit from "./pages/FunctionEdit";
import UpdateAccount from "./pages/UpdateAccount";
import AdminRoute from "./components/Routing/AdminRoute";
import TechnicianRoute from "./components/Routing/TechnicianRoute";
import ClientRoute from "./components/Routing/ClientRoute";
import CommonRoute from "./components/Routing/CommonRoute";


function App() {





  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>


          <Route path="signup" element={<Signup />} />

          <Route path="login" element={<Login />} />


                
          {/* <Route path="ConfirmSuppression" element={<ConfirmSuppression />} />
          <Route path="ConfirmReset" element={<ConfirmReset />} />
          <Route path="Parameters" element={<Parameter />} />
          

          <Route path="UserEdit" element={<UserEdit />} /> */}

          {/* <Route path="claim" element={<Claim />} />
          <Route path="reclamations" element={<Reclamations />} /> */}
          <Route path="logout" element={<LogoutLink />} />

     

          



          <Route
            path="ChangePassword/:activationToken"
            element={<ChangePassword />}
          />





















          

  

{/* Admin Routing */}


<Route exact path='/list/:userType' element={<AdminRoute/>}>
      <Route exact path='/list/:userType' element={<UserList/>}/>
</Route>



<Route exact path='/EditCategory/:idCategorie' element={<AdminRoute/>}>
      <Route exact path='/EditCategory/:idCategorie' element={<CategoryEdit/>}/>
</Route>

<Route exact path='/list/reclams/:reclamationType' element={<AdminRoute/>}>
      <Route exact path='/list/reclams/:reclamationType' element={<ReclamationsList/>}/>
</Route>




<Route exact path='/userMoreDetails/:email' element={<AdminRoute/>}>
      <Route exact path='/userMoreDetails/:email' element={<UserMoreDetails/>}/>
</Route>



<Route exact path='/update_account/:email' element={<AdminRoute/>}>
      <Route exact path='/update_account/:email' element={<UpdateAccount/>}/>
</Route>



<Route exact path='/CategoryOptions' element={<AdminRoute/>}>
      <Route exact path='/CategoryOptions' element={<CategoryOptions/>}/>
</Route>



<Route exact path='/FunctionsOptions' element={<AdminRoute/>}>
      <Route exact path='/FunctionsOptions' element={<FunctionOptions/>}/>
</Route>


<Route exact path='/addTechnician' element={<AdminRoute/>}>
      <Route exact path='/addTechnician' element={<AddTechnician/>}/>
</Route>

<Route exact path='/addCategory' element={<AdminRoute/>}>
      <Route exact path='/addCategory' element={<AddCategory/>}/>
</Route>


<Route exact path='/AddFunction' element={<AdminRoute/>}>
      <Route exact path='/AddFunction' element={<AddFunction/>}/>
</Route>



<Route exact path='/dashboard' element={<AdminRoute/>}>
      <Route exact path='/dashboard' element={<Admin/>}/>
</Route>




<Route exact path='/adminDetails' element={<AdminRoute/>}>
      <Route exact path='/adminDetails' element={<AdminDetails/>}/>
</Route>


<Route exact path='/ParametersAdmin' element={<AdminRoute/>}>
      <Route exact path='/ParametersAdmin' element={<ParameterAdmin/>}/>
</Route>


<Route exact path='/EditFunction/:idFunction' element={<AdminRoute/>}>
      <Route exact path='/EditFunction/:idFunction' element={<FunctionEdit/>}/>
</Route>
         

<Route exact path='/Confirm_delete/:email' element={<AdminRoute/>}>
      <Route exact path='/Confirm_delete/:email' element={<ConfirmSuppAccount/>}/>
</Route>


<Route exact path='/AdminEdit' element={<AdminRoute/>}>
      <Route exact path='AdminEdit' element={<AdminEdit/>}/>
</Route>







{/* Admin Routing */}





{/* technician Routing */}

<Route exact path='/interventions/:interventionType' element={<TechnicianRoute/>}>
      <Route exact path='/interventions/:interventionType' element={<InterventionsList/>}/>
</Route>

{/* technician Routing */}



{/* Common Route technician & Client */}

<Route exact path='/userdetails' element={<CommonRoute/>}>
      <Route exact path='/userdetails' element={<InfoUser/>}/>
</Route>


<Route exact path='/ConfirmSuppression' element={<CommonRoute/>}>
      <Route exact path='/ConfirmSuppression' element={<ConfirmSuppression/>}/>
</Route>



<Route exact path='/ConfirmReset' element={<CommonRoute/>}>
      <Route exact path='/ConfirmReset' element={<ConfirmReset/>}/>
</Route>


<Route exact path='/Parameters' element={<CommonRoute/>}>
      <Route exact path='/Parameters' element={<Parameter/>}/>
</Route>


<Route exact path='/UserEdit' element={<CommonRoute/>}>
      <Route exact path='/UserEdit' element={<UserEdit/>}/>
</Route>
          



{/* Common Route technician & Client  */}










{/* Client Routing */}

<Route exact path='/claim' element={<ClientRoute/>}>
      <Route exact path='/claim' element={<Claim/>}/>
</Route>

<Route exact path='/reclamations' element={<ClientRoute/>}>
      <Route exact path='/reclamations' element={<Reclamations/>}/>
</Route>



{/* Client Routing  */}



</Route>

{/* technician Routing */}






        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
