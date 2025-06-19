import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Cards from '../script/Content/Cards';

export default function LocationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    location,
    getLocationById,
    characters,
    getMultipleCharacters,
  } = useData();

  useEffect(() => {
    getLocationById(id);
  }, [id]);

  useEffect(() => {
    if (location?.residents?.length) {
      const ids = location.residents.map(url => url.split('/').pop());
      getMultipleCharacters(ids);
    }
  }, [location]);

  if (!location) return <div>Loading...</div>;

  return (
    <main className="main">
      <button className="goback-btn" onClick={() => navigate(-1)} aria-label="Go back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="black" />
        </svg>
        GO BACK
      </button>

      <h1 className="main__title">{location.name}</h1>

      <section className="selected-filters">
        <div className="selected-filters__item">
          <p>Type</p>
          <span>{location.type}</span>
        </div>
        <div className="selected-filters__item">
          <p>Dimension</p>
          <span>{location.dimension}</span>
        </div>
      </section>

      <div className="characters-wrapper">
        <h3 className="characters__subtitle">Residents</h3>
        <section className="card-list characters cards">
          {characters.length > 0 ? (
            characters.map(character => (
              <Cards key={character.id} data={character} type="character" />
            ))
          ) : (
            <p>Not Found</p>
          )}
        </section>
      </div>
    </main>
  );
}
