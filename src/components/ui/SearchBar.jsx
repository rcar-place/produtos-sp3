// ============================================
// SP3 CONECTORES — SearchBar Component
// ============================================

import { useState, useCallback, useEffect, memo } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '../../utils/helpers';
import './SearchBar.css';

/**
 * Search bar with debounce
 * @param {Object} props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Search change handler
 * @param {string} props.placeholder - Placeholder text
 */
function SearchBar({ value = '', onChange, placeholder = 'Buscar por nome ou código...' }) {
  const [localValue, setLocalValue] = useState(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((val) => {
      onChange?.(val);
    }, 300),
    [onChange]
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.('');
  };

  return (
    <div className="search-bar" id="search-bar">
      <Search className="search-bar__icon" size={20} />
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        aria-label="Buscar produtos"
        id="search-input"
      />
      {localValue && (
        <button
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Limpar busca"
          type="button"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default memo(SearchBar);
