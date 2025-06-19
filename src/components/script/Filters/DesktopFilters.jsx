import FilterSelect from './FilterSelect';
import { Search } from '../../icons/icons';

export default function DesktopFilters({
  name,
  setName,
  filtersConfig = [],
}) {
  return (
    <div className="filters desktop-only">
      <div className="filters__filter-item">
        <Search />
        <input
          type="text"
          placeholder="Filter by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {filtersConfig.map(({ label, value, setValue, options }, index) => (
        <FilterSelect
          key={index}
          label={label}
          value={value}
          onChange={setValue}
          options={options}
        />
      ))}
    </div>
  );
}

