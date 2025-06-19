import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    
    const [characters, setCharacters] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [locations, setLocations] = useState([]);

    
    const [character, setCharacter] = useState(null);
    const [episode, setEpisode] = useState(null);
    const [location, setLocation] = useState(null);

    const BASE_URL = 'https://rickandmortyapi.com/api';

    const fetchFromApi = async (endpoint, setter) => {
    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setter(data.results || data); 
    } catch (err) {
        console.error(`Ошибка при загрузке ${endpoint}:`, err.message);
        setter([]);
    }
    };

    const buildQuery = ( page = 1, filters = {}) => {
        const params = new URLSearchParams({ ...filters, page });
        return `?${params.toString()}`;
    };

    const getCharacters = (page = 1, filters = {}) => {
        fetchFromApi(`${BASE_URL}/character${buildQuery(page, filters)}`, (newData) => {
          setCharacters(prev => page === 1 ? newData : [...prev, ...newData]);
        });
      };
      
      const getEpisodes = (  page = 1, filters = {}) => {
        fetchFromApi(`${BASE_URL}/episode${buildQuery(page, filters)}`, (newData) => {
          setEpisodes(prev => page === 1 ? newData : [...prev, ...newData]);
        });
      };
      
      const getLocations = (page = 1, filters = {}) => {
        fetchFromApi(`${BASE_URL}/location${buildQuery(page, filters)}`, (newData) => {
          setLocations(prev => page === 1 ? newData : [...prev, ...newData]);
        });
      };
      

    const getCharacterById = (id) => {
        fetchFromApi(`${BASE_URL}/character/${id}`, setCharacter);
    };

    const getEpisodeById = (id) => {
        fetchFromApi(`${BASE_URL}/episode/${id}`, setEpisode);  
    };

    const getLocationById = (id) => {
        fetchFromApi(`${BASE_URL}/location/${id}`, setLocation);
    };

    const getMultipleCharacters = (ids = []) => {
        if (!ids.length) return setCharacters([]);
            const list = ids.join(',');
            fetchFromApi(`${BASE_URL}/character/${list}`, setCharacters);
    };

    const [episodesByIds, setEpisodesByIds] = useState([]);

    const getEpisodesByIds = (ids = []) => {
        if (!ids.length) return setEpisodesByIds([]);
            const list = ids.join(',');
            fetchFromApi(`${BASE_URL}/episode/${list}`, setEpisodesByIds);
    };


    return (
    <DataContext.Provider
        value={{
        characters, getCharacters, getMultipleCharacters,
        episodes, getEpisodes,
        locations, getLocations,

        character, getCharacterById,
        episode, getEpisodeById,
        location, getLocationById,

        episodesByIds, getEpisodesByIds,
        }}
    >
        {children}
    </DataContext.Provider>
    );
    }

    export function useData() {
    return useContext(DataContext);
    }
