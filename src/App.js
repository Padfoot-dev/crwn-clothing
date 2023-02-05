import {Routes , Route} from "react-router-dom";
import Home from "./routes/Home/home.component";
import Navigation from "./routes/Navingation/navingation.component";
import Authentication from "./routes/Authentication/authentication.component";


const Shop = ()=> {
  return(
    <div>
      <h1>I am the shop element</h1>
    </div>
  )
}

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index={true} element={<Home/>} />
        <Route path="shop" element={<Shop/>} />
        <Route path="auth" element={<Authentication/>} />
      </Route>
    </Routes> 
  )
}

export default App;
