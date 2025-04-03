import { useEffect, useState } from "react";

const FilterSection = ({ filters, setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        setFilters({
            category: "Category",
            department: "Department",
            startDate: "01/08/2005",
            endDate: "06/12/2025"
        });
    }, [setFilters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 w-full text-black">
      
      {/* category */}
      <select
        className="p-2 border rounded-lg w-full"
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
      >
        <option value="Category" disabled>
          Category
        </option>
        <option value="Seminars">Seminars</option>
        <option value="Workshops">Workshops</option>
        <option value="Sports">Sports</option>
      </select>

      {/* DEPARTMENT */}
      <select
        className="p-2 border rounded-lg w-full"
        name="department"
        value={filters.department}
        onChange={handleFilterChange}
      >
        <option value="Department" disabled>
          Department
        </option>
        <option value="Computer Science">Computer Science</option>
        <option value="Engineering">Engineering</option>
        <option value="Business">Business</option>
      </select>
      
      {/* START DATE */}
      <div className="flex flex-col">
        <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          className="p-2 border rounded-lg w-full"
          name="startDate"
          value={filters.startChange}
          onChange={handleFilterChange}
          placeholder="Start Date"
        />
      </div>
      
      {/* END DATE */}
      <div className="flex flex-col">
        <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          className="p-2 border rounded-lg w-full"
          name="endDate"
          onChange={filters.endDate}
          placeholder="End Date"
        />
      </div>
    </div>
  );
};

const Event2 = () => {
    const [filters, setFilters] = useState({});

    return (
        <div className="bg-white min-h-screen min-w-screen flex flex-col mx-auto overflow-hidden">
            <FilterSection filters={filters} setFilters={setFilters}/>
            
        </div>
    )
}

export default Event2;