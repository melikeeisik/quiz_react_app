import Routerr from './components/Router';
import style from "./style.module.css"
function App() {
  return (
    <div className={style.appName}>
      <Routerr/>
    </div>
  );
}

export default App;


/*-----ETİCARET----
import logo from './logo.svg';
import './App.css';


import RouterPage from './components/RouterPage';
import Container from './components/Container';
import { ProductsProvider } from './context/ProductsContext';
function App() {
  
  return (
    <div className="App">
      <RouterPage/>
      <ProductsProvider/>
    </div>
  );
}

export default App;
*/