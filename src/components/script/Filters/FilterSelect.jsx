import { useRef } from 'react';

export default function FilterSelect({ label, value, onChange, options }) {
  const wrapperRef = useRef(null);

  const hasValue = value !== '';

  const handleReset = (e) => {
    e.stopPropagation(); 
    onChange('');
  };

  return (
    <div
      className={`select-wrapper${hasValue ? ' has-value' : ''}`}
      ref={wrapperRef}
    >
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option disabled value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {hasValue && (
        <span
          className="reset-filter"
          onClick={handleReset}
        >
          ×
        </span>
      )}
    </div>
  );
}
