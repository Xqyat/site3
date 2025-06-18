import FilterSelect from './FilterSelect';

export default function MobileFilters({
  name,
  setName,
  filtersConfig = [],
  onApply,
  onClose,
}) {
  return (
    <>
      <div className="overlay-blur visible" onClick={onClose}></div>
      <div className="mobile-filters open">
        <div className="mobile-filters__content">
          <div className="mobile-filters__content-title-wrapper">
            <h3>Filters</h3>
            <button className="close-btn" onClick={onClose}>×</button>
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

          <button className="open-filters apply-filters" onClick={onApply}>Apply</button>
        </div>
      </div>
    </>
  );
}
