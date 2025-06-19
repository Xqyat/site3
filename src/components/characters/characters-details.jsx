import './characters-details.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { ArrowBack, DetailsArrow } from '../icons/icons';

export default function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    character,
    getCharacterById,
    episodesByIds,
    getEpisodesByIds,
  } = useData();

  useEffect(() => {
    getCharacterById(id);
  }, [id]);

  // Загружаем эпизоды, если есть character
  useEffect(() => {
    if (character && Array.isArray(character.episode)) {
      const ids = character.episode
        .slice(0, 4)
        .map(url => url.split('/').pop());
      getEpisodesByIds(ids);
    }
  }, [character]);

  if (!character) return <div>Loading...</div>;

  return (
    <main className="main">
      <button className="goback-btn" onClick={() => navigate(-1)}>
        <ArrowBack/>
        GO BACK
      </button>

      <section className="character-details">
        <div className="character-details__portrait">
          <img src={character.image} alt={character.name} />
          <h1>{character.name}</h1>
        </div>
        <div className="character-details__info">
          <div className="character-details__info-block informations-items">
            <h3>Informations</h3>
            {[
              ['Gender', character.gender],
              ['Status', character.status],
              ['Species', character.species],
              ['Origin', character.origin.name],
              ['Type', character.type || 'Unknown'],
              ['Location', character.location.name, character.location.url]
            ].map(([label, value, url], i) => {
              const locationId = url?.split('/').pop();
              const content = (
                <>
                  <div className="informations__item-contetnt">
                    <h6>{label}</h6>
                    <span>{value}</span>
                  </div>
                  {url && (
                    <div className="informations__item-svg">
                      <DetailsArrow/>
                    </div>
                  )}
                </>
              );

              return url ? (
                <Link to={`/locations/${locationId}`} className="informations__item" key={i}>
                  {content}
                </Link>
              ) : (
                <article className="informations__item" key={i}>
                  {content}
                </article>
              );
            })}
          </div>

          <div className="character-details__info-block episodes-items">
            <h3>Episodes</h3>
            {episodesByIds.map((ep) => (
              <Link
                to={`/episodes/${ep.id}`}
                key={ep.id}
                className="episodes__item"
              >
                <div className="episodes__item-content">
                  <h6>{ep.episode}</h6>
                  <span>{ep.name}</span>
                  <p>{ep.air_date}</p>
                </div>
                <div className="episodes__item-svg">
                  <DetailsArrow/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
