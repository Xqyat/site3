// import '../../../index.css'
// import FilterSelect from './FilterSelect';

// export default function DesktopFilters({
//   name,
//   setName,
//   type,
//   setType,
//   dimension,
//   setDimension,
//   typeOptions,
//   dimensionOptions,
// }) {
//   return (
//     <div className="filters desktop-only">
//       <div className="filters__filter-item">
//         <input
//           className=""
//           type="text"
//           placeholder="Filter by name..."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <FilterSelect
//         value={type}
//         onChange={setType}
//         options={typeOptions}
//       />
//       <FilterSelect
//         value={dimension}
//         onChange={setDimension}
//         options={dimensionOptions}
//       />
//     </div>
//   );
// }

import FilterSelect from './FilterSelect';

export default function DesktopFilters({
  name,
  setName,
  filtersConfig = [],
}) {
  return (
    <div className="filters desktop-only">
      <div className="filters__filter-item">
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

