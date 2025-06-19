import './episodes.css';
import { useEffect, useState } from 'react';
import Cards from '../script/Content/Cards';
import LoadMoreBtn from '../script/Content/LoadMoreBtn';
import main_logo from '../../assets/images/episodes.png';
import { Search } from '../icons/icons';
import { useData } from '../../context/DataContext';

export default function Episodes() {

  const [nameFilter, setNameFilter] = useState('');
  const [page, setPage] = useState(1);

  const { episodes, getEpisodes } = useData();

  

  const filters = {
    name: nameFilter,
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      getEpisodes(page, filters); 
    }, 300);
    return () => clearTimeout(timeout);
  }, [JSON.stringify(filters), page]);
  
  useEffect(() => {
    setPage(1); 
  }, [nameFilter]);


    return (
        <main className="main">
        <img src={main_logo} alt="Main logo" />
        
        <div className="filters__filter-item episodes-search">
          <Search />
          <input
            type="text"
            placeholder="Filter by name or episode (ex. S01 or S01E02)"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

       
        <div className="card-list episodes cards">
          {episodes.length > 0 ? (
            episodes.map(episode  => (
              <Cards key={episode.id} data={episode} type="episode" />
            ))
          ) : (
            <p>Not Found</p>
          )}
        </div>
      <LoadMoreBtn onClick={() => setPage(prev => prev + 1)} />
    </main>
    );
  }
  