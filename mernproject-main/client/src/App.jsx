
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Register } from './pages/Register';
import { Services } from './pages/services';
import { Navbar} from "./Components/Navbar";
import { Footer} from "./Components/Footer"
import { Error }  from  './pages/Error/Error';
import { AdminLayout } from "./Components/layout/admin-layout";
import { AdminUsers } from "./pages/admin-users";
import { AdminContacts } from "./pages/admin-contact";
import { AdminUpdate } from "./pages/admin-update";









const App = () => {
  return ( <>
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/services" element={<Services />} />
      <Route path="*"  element={<Error />} />
      <Route  path="/admin"  element={<AdminLayout/>}>
      <Route  path="users"  element={<AdminUsers/>}/>
      <Route  path="contacts"  element={<AdminContacts/>}/>
      <Route   path="users/:id/edit" element={<AdminUpdate/>}/>
      </Route>

  
    </Routes>
    <Footer/>
  </BrowserRouter>
  </>

);

  };

export default App;
