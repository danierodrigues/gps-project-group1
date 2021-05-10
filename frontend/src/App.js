
import Menu from './components/Menu/Menu';
import Advantages from './components/Advantages/Advantages';
import About from './components/About/About';
import Locations from './components/Locations/Locations';
import SelectionProcess from './components/SelectionProcess/SelectionProcess';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Footer from './components/Footer/Footer';

function App() {
  const { REACT_APP_API_URL, REACT_APP_ENV } = process.env;
  return (
    <main>
      <h1>{REACT_APP_ENV}</h1>
      { console.log("aqui") }
      { console.log(process.env) }
      { console.log(REACT_APP_API_URL) }
      process.env.API_URL
      <Menu />
      <About />
      <Advantages />
      <SelectionProcess />
      <RegistrationForm />
      <Footer />
    </main>
  );
}

export default App;
