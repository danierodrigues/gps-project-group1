import Landing from './components/Landing/Landing';
import Advantages from './components/Advantages/Advantages';
import About from './components/About/About';
import Locations from './components/Locations/Locations';
import SelectionProcess from './components/SelectionProcess/SelectionProcess';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function App() {

  return (
      <main>
        <ScrollAnimation animateIn='animate__fadeIn' duration={1.5} animateOnce={true}>
          <Landing />
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeIn' animateOnce={true}>
          <About />
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true}>
          <Locations />
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInRight' animateOnce={true}>
          <Advantages />
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeIn' animateOnce={true}>
          <SelectionProcess />
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true}>
          <RegistrationForm />
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInLeft' animateOnce={true}>
          <FAQ />
        </ScrollAnimation>
        <Footer />
      </main>
  );
}

export default App;
