import Landing from './components/Landing/Landing';
import Advantages from './components/Advantages/Advantages';
import About from './components/About/About';
import Locations from './components/Locations/Locations';
import SelectionProcess from './components/SelectionProcess/SelectionProcess';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <main>
      <Landing />
      <About />
      <Locations />
      <Advantages />
      <SelectionProcess />
      <RegistrationForm />
      <FAQ />
      <Footer />
    </main>
  );
}

export default App;
