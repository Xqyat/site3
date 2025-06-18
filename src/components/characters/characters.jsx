import './characters.css';
import { useEffect, useState } from 'react';
import { DesktopFilters, MobileFilters, UseFilteredData } from '../../index';
import Cards from '../script/Content/Cards';
import LoadMoreBtn from '../script/Content/LoadMoreBtn';
import { FiltersConfig } from '../script/Filters/FiltersConfig';
import main_logo from '../../assets/icons/Logo.svg'
export default function Characters() {

    const { speciesOptions, genderOptions, statusOptions } = FiltersConfig.character;
    
      const [nameFilter, setNameFilter] = useState('');
      const [selectedSpecies, setSelectedSpecies] = useState('');
      const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedGender, setSelectedGender] = useState('');
    
      const {
        data: characters,
        nextPageUrl,
        fetchMore,
        applyFilters,
        showMobileFilters,
        setShowMobileFilters,
        isDesktop,
      } = UseFilteredData({
        baseUrl: 'https://rickandmortyapi.com/api/character',
        filters: {
          name: nameFilter,
          species: selectedSpecies,
          gender: selectedGender,
          status: selectedStatus,
        },
        isImmediate: true,
      });

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
        <img className="main__logo" src={main_logo} alt="Main logo" />
        {!isDesktop && (
          <div className="filters__filter-item">
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
          <div class="open-filters__text-wrapper">Advanced Filters</div>
            <div class="open-filters__spans">
                <span class="open-filters__spans-one"></span>
                <span class="open-filters__spans-two"></span>
                <span class="open-filters__spans-three"></span>
            </div>
        </button>

        {isDesktop ? (
          <DesktopFilters
          name={nameFilter}
          setName={setNameFilter}
          filtersConfig={filtersConfig}
        />
        ) : (
          showMobileFilters && (
            <MobileFilters
            name={nameFilter}
            setName={setNameFilter}
            filtersConfig={filtersConfig}
            onApply={() => {
              applyFilters();
              setShowMobileFilters(false);
            }}
            onClose={() => setShowMobileFilters(false)}
          />
          )
        )}

        <div className="card-list characters cards">
          {characters.length > 0 ? (
            characters.map(character  => (
              <Cards key={character.id} data={character} type="character" />
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
  