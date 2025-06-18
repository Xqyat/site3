import './episodes.css';
import { useEffect, useState } from 'react';
import { DesktopFilters, MobileFilters, UseFilteredData } from '../../index';
import Cards from '../script/Content/Cards';
import LoadMoreBtn from '../script/Content/LoadMoreBtn';
import main_logo from '../../assets/images/episodes.png';
import search from '../../assets/icons/search.svg';
export default function Episodes() {

  const [name, setName] = useState('');

  const {
    data: episodes,
    nextPageUrl,
    fetchMore,
  } = UseFilteredData({
    baseUrl: 'https://rickandmortyapi.com/api/episode',
    isImmediate: true,
    filters: { name }, 
  });

    return (
        <main className="main">
        <img src={main_logo} alt="Main logo" />
        
        <div className="filters__filter-item episodes-search">
          <img src={search} alt="Search" />
          <input
            type="text"
            placeholder="Filter by name or episode (ex. S01 or S01E02)"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      {nextPageUrl && (
          <LoadMoreBtn onClick={() => fetchMore()} />
        )}
    </main>
    );
  }
  