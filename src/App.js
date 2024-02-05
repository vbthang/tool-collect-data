import Content from './component/Content';
import Header from './component/Header';
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
