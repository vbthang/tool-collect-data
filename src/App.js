import Content from './component/Content';
import Header from './component/Header';
import Measurement from './component/Measurement';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App container">
      <form>
        <Header />
        <Content />
        <Footer />
      </form>
    </div>
  );
}

export default App;
