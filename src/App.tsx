import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AppRouter } from './routes/AppRouter';
const App = () => {
    return (<Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </Router>);
};
export default App;
