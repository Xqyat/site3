import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../script/Content/Cards'; // импорт твоего компонента карточек


export default function LocationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Location not found');
        return res.json();
      })
      .then(data => {
        setLocation(data);
  
        const residentIds = data.residents.map(url => url.split('/').pop()).join(',');
        return fetch(`https://rickandmortyapi.com/api/character/${residentIds}`);
      })
      .then(res => {
        if (!res.ok) throw new Error('Characters not found');
        return res.json();
      })
      .then(charData => {
        setCharacters(Array.isArray(charData) ? charData : [charData]);
      })
      .catch(error => console.error(error));
  }, [id]);
  

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
