import './locations.css'
import main_logo from '../../assets/images/locations.png'
import { useEffect, useState } from 'react';
import { DesktopFilters, MobileFilters, UseFilteredData } from '../../index';
import Cards from '../script/Content/Cards';
import LoadMoreBtn from '../script/Content/LoadMoreBtn';
import { FiltersConfig } from '../script/Filters/FiltersConfig';



const Locations = () => {

  const { typeOptions, dimensionOptions } = FiltersConfig.location;

  const [nameFilter, setNameFilter] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');

  const {
    data: locations,
    nextPageUrl,
    fetchMore,
    applyFilters,
    showMobileFilters,
    setShowMobileFilters,
    isDesktop,
  } = UseFilteredData({
    baseUrl: 'https://rickandmortyapi.com/api/location',
    filters: {
      name: nameFilter,
      type: selectedType,
      dimension: selectedDimension,
    },
    isImmediate: true,
  });
  
  const filtersConfig = [
    {
      label: 'Type',
      value: selectedType,
      setValue: setSelectedType,
      options: typeOptions,
    },
    {
      label: 'Dimension',
      value: selectedDimension,
      setValue: setSelectedDimension,
      options: dimensionOptions,
    },
  ];

  return (
    <main className="main">
        <img src={main_logo} alt="Main logo" />
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

        <div className="card-list locations cards">
          {locations.length > 0 ? (
            locations.map(location  => (
              <Cards key={location.id} data={location} type="location" />
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
};

export default Locations;

