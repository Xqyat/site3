import './locations.css'
import main_logo from '../../assets/images/locations.png'
import { useEffect, useState } from 'react';
import { DesktopFilters, MobileFilters } from '../../index';
import Cards from '../script/Content/Cards';
import LoadMoreBtn from '../script/Content/LoadMoreBtn';
import { FiltersConfig } from '../script/Filters/FiltersConfig';
import { useData } from '../../context/DataContext';
import { Search } from '../icons/icons';


const Locations = () => {

  const { typeOptions, dimensionOptions } = FiltersConfig.location;

  const [nameFilter, setNameFilter] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [page, setPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 530);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { locations, getLocations } = useData();

  const filters = {
    name: nameFilter,
    type: selectedType,
    dimension: selectedDimension,
  };

  useEffect(() => {
    if (isDesktop)
      {
        const timeout = setTimeout(() => {
          getLocations(page, filters); 
        }, 300);
        return () => clearTimeout(timeout);
      } 
  }, [JSON.stringify(filters), page]);

  useEffect(() => {
    if (!isDesktop)
      {
        const timeout = setTimeout(() => {
          getLocations(page, filters); 
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
              getLocations(1, filters);
              setShowMobileFilters(false);
            }}
            onClose={() => setShowMobileFilters(false)}
          />
        )
      )}

        <div className="card-list locations cards">
          {locations.length > 0 ? (
            locations.map((location, index)  => (
              <Cards key={index} data={location} type="location" />
            ))
          ) : (
            <p>Not Found</p>
          )}
        </div>
        <LoadMoreBtn onClick={() => setPage(prev => prev + 1)} />
    </main>
    
  );
};

export default Locations;

