import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import CarouselQuotes from '../Pages/carousel';
import ConfigPage from '../Pages/ConfigPage';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/quotes' : CarouselQuotes,
  '/config' : ConfigPage
};

export default routes;
