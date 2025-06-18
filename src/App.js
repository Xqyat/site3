import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Characters from './components/characters/characters';
import CharactersDetails from './components/characters/characters-details';

import Episodes from './components/episodes/episodes';
import EpisodesDetails from './components/episodes/episodes-details';

import Locations from './components/locations/locations';
import LocationsDetails from './components/locations/locations-details';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharactersDetails />} />

        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:id" element={<LocationsDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodesDetails />} />

        {/* Можно добавить маршрут по умолчанию */}
        <Route path="*" element={<Characters />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
