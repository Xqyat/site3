import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Cards from '../script/Content/Cards';
import { ArrowBack } from '../icons/icons';

export default function EpisodeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    episode,
    getEpisodeById,
    characters,
    getMultipleCharacters,
  } = useData();

  useEffect(() => {
    getEpisodeById(id);
  }, [id]);

  useEffect(() => {
    if (episode && Array.isArray(episode.characters)) {
      const ids = episode.characters.map(url => url.split('/').pop());
      getMultipleCharacters(ids);
    }
  }, [episode]);

  if (!episode) return <div>Loading...</div>;

  return (
    <main className="main">
      <button className="goback-btn" onClick={() => navigate(-1)}>
        <ArrowBack/>
         GO BACK
      </button>

      <h1 className="main__title">{episode.name}</h1>

      <section className="selected-filters">
        <div className="selected-filters__item">
          <p>Episode</p>
          <span>{episode.episode}</span>
        </div>
        <div className="selected-filters__item">
          <p>Date</p>
          <span>{episode.air_date}</span>
        </div>
      </section>

      <div className="characters-wrapper">
        <h3 className="characters__subtitle">Cast</h3>
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
