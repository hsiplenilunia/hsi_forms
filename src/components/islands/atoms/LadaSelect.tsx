import React, { useState, useEffect, useRef } from 'react';

export type Country = {
  country: string;
  flag: string;
  lada: string;
  abreviation: string;
};

export type CountryLadaSelectProps = {
  countries: Country[];
  value?: Country | null;
  name?: string;
  className?: string;
  onChange?: (value: Country | null) => void;
};


export const CountryLadaSelect: React.FC<CountryLadaSelectProps> = ({
  countries,
  value,
  name,
  className = '',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(value || null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCountry(value || null);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  const filteredCountries = countries.filter(country => {
    if (!searchTerm) return true;
    const normalizedSearchTerm = normalizeString(searchTerm);

    return (
      normalizeString(country.country).includes(normalizedSearchTerm) ||
      normalizeString(country.lada).includes(normalizedSearchTerm) ||
      normalizeString(country.abreviation).includes(normalizedSearchTerm)
    );
  });

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setSearchTerm('');
    setIsOpen(false);
    onChange?.(country);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);
    if (!term) {
      setSelectedCountry(null);
      onChange?.(null);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <input type="hidden" name={name} value={selectedCountry?.abreviation || ''} />
      <div
        className="flex items-center w-full px-3 py-2 text-base border rounded-md shadow-sm cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry ? (
          <div className="flex items-center">
            <span className="mr-2">{selectedCountry.flag}</span>
            <span className="text-gray-900">{selectedCountry.country}</span>
            <span className="ml-2 text-gray-500">{selectedCountry.lada}</span>
          </div>
        ) : (
          <div className="text-gray-500">Seleccionar país...</div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar país, LADA o abreviación..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <ul>
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <li
                  key={country.abreviation}
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(country)}
                >
                  <span className="mr-2">{country.flag}</span>
                  <span className="text-gray-900">{country.country}</span>
                  <span className="ml-2 text-gray-500 text-sm">{country.lada}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No se encontraron resultados.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};