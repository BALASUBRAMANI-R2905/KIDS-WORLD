import React from "react";

const Filterside = ({ filters, onFilterChange, selectedFilters }) => {
  const handleCheckboxChange = (type, value) => {
    const updated = selectedFilters[type].includes(value)
      ? selectedFilters[type].filter((v) => v !== value)
      : [...selectedFilters[type], value];

    const newFilters = { ...selectedFilters, [type]: updated };
    onFilterChange(newFilters);
  };

  const renderCheckboxGroup = (title, type, options) => (
    <div>
      <h3 className="font-semibold mb-2 mt-4">{title}</h3>
      {options.map((item) => (
        <label key={item} className="block text-sm text-gray-700">
          <input
            type="checkbox"
            className="mr-2 accent-indigo-600"
            checked={selectedFilters[type].includes(item)}
            onChange={() => handleCheckboxChange(type, item)}
          />
          {item}
        </label>
      ))}
    </div>
  );

  return (
    <div className="w-64 bg-gray-100 shadow-md mt-4 p-4 flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Filters</h2>

      {renderCheckboxGroup("General", "general", filters.general)}
      {renderCheckboxGroup("Brand", "brand", filters.brand)}
      {renderCheckboxGroup("Sizes", "size", filters.size)}
      {renderCheckboxGroup("Price", "price", ["0-200", "200-400", "400-1000", "1000+"])}
      {renderCheckboxGroup("Discount", "discount", ["10-30%", "40-70%", "80%+"])}
      {renderCheckboxGroup("Colour", "colour", filters.colour)}
    </div>
  );
};

export default Filterside;
