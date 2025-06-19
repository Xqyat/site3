import './characters.css';
import { useEffect, useState } from 'react';
import { DesktopFilters, MobileFilters } from '../../index';
import Cards from '../script/Content/Cards';
import LoadMoreBtn from '../script/Content/LoadMoreBtn';
import { FiltersConfig } from '../script/Filters/FiltersConfig';
import { MainLogoIcon, Search } from '../icons/icons';
import { useData } from '../../context/DataContext';
export default function Characters() {

    const { speciesOptions, genderOptions, statusOptions } = FiltersConfig.character;
    
      const [nameFilter, setNameFilter] = useState('');
      const [selectedSpecies, setSelectedSpecies] = useState('');
      const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedGender, setSelectedGender] = useState('');
      const [page, setPage] = useState(1);
      const [isDesktop, setIsDesktop] = useState(window.innerWidth > 530);
      const [showMobileFilters, setShowMobileFilters] = useState(false);
    
      const { characters, getCharacters } = useData();

      const filters = {
        name: nameFilter,
        species: selectedSpecies,
        gender: selectedGender,
        status: selectedStatus,
      };
    
      useEffect(() => {
        if (isDesktop)
          {
            const timeout = setTimeout(() => {
              getCharacters(page, filters); 
            }, 300);
            return () => clearTimeout(timeout);
          } 
      }, [JSON.stringify(filters), page]);

      useEffect(() => {
        if (!isDesktop)
          {
            const timeout = setTimeout(() => {
              getCharacters(page, filters); 
            }, 300);
            return () => clearTimeout(timeout);
          } 
      }, [page]);
      
      useEffect(() => {
        if (isDesktop) {
          setPage(1); 
        }
      }, [JSON.stringify(filters)]);
      
      useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 530);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const filtersConfig = [
        {
          label: 'Species',
          value: selectedSpecies,
          setValue: setSelectedSpecies,
          options: speciesOptions,
        },
        {
          label: 'Status',
          value: selectedStatus,
          setValue: setSelectedStatus,
          options: statusOptions,
        },
        {
          label: 'Gender',
          value: selectedGender,
          setValue: setSelectedGender,
          options: genderOptions,
        },
      ];


    return (
      <main className="main">
      <MainLogoIcon className="main__logo" />

      {!isDesktop && (
        <div className="filters__filter-item">
          <Search/>
          <input
            className="mobile-name-filter"
            type="text"
            placeholder="Filter by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      )}

      <button
        className="open-filters"
        onClick={() => setShowMobileFilters(true)}
        style={{ display: isDesktop ? 'none' : 'block' }}
      >
        <div className="open-filters__text-wrapper">Advanced Filters</div>
        <div className="open-filters__spans">
          <span className="open-filters__spans-one"></span>
          <span className="open-filters__spans-two"></span>
          <span className="open-filters__spans-three"></span>
        </div>
      </button>

      {isDesktop ? (
        <DesktopFilters name={nameFilter} setName={setNameFilter} filtersConfig={filtersConfig} />
      ) : (
        showMobileFilters && (
          <MobileFilters
            name={nameFilter}
            setName={setNameFilter}
            filtersConfig={filtersConfig}
            onApply={() => {
              setPage(1); 
              getCharacters(1, filters);
              setShowMobileFilters(false);
            }}
            onClose={() => setShowMobileFilters(false)}
          />
        )
      )}

      <div className="card-list characters cards">
        {characters.length > 0 ? (
          characters.map((character, index) => (
            <Cards key={index} data={character} type="character" />
          ))
        ) : (
          <p>Not Found</p>
        )}
      </div>
      <LoadMoreBtn onClick={() => setPage(prev => prev + 1)} />
      </main>
    );
  }
  