import './App.css';
import  Header  from './shared/Header.js';
import Body from './components/Body';
import Footer from './shared/Footer';
import { Outlet } from 'react-router-dom';


const App = () => {
  return (
   <>
   {/* <Header/> */}
   <Outlet/>
   <Footer/>
   </>
  );
}

export default App;

