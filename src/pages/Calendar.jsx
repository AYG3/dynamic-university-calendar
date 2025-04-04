import React, { useEffect, useState } from "react";
import { getEvents } from "../services/api";

// const FilterSection = ({ filters, setFilters }) => {
//   const handleFilterChange = (e) => {
//     setFilters((prev) => (
//       {...prev, [e.target.name]: e.target.value}
//     ))
//     console.log("Filter: ", filters)
//   }
  
//   return(
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full text-black">
//       <select className="p-2 border rounded-lg w-full" onChange={handleFilterChange} name="category">
//         <option value="Category" disabled>Category</option>
//         <option>Seminars</option>
//         <option>Workshops</option>
//         <option>Sports</option>
//       </select>
//       <select className="p-2 border rounded-lg w-full" onChange={handleFilterChange}>
//         <option disabled>Department</option>
//         <option>Computer Science</option>
//         <option>Engineering</option>
//         <option>Business</option>
//       </select>
//       <input type="date" className="p-2 border rounded-lg w-full" onChange={handleFilterChange}/>
//     </div>
//   )
// }

const FilterSection = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Filter: ", filters);
  };

  useEffect(() => {
    setFilters({
      category: "Category",
      department: "Department",
      startDate: "",
      endDate: "",
    });
  }, [setFilters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6 w-full text-black">
      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="Category" disabled>
            Select Category
          </option>
          <option value="Seminars">Seminars</option>
          <option value="Workshops">Workshops</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="department" className="text-sm font-medium text-gray-700 mb-1">
          Department
        </label>
        <select
          id="department"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
        >
          <option value="Department" disabled>
            Select Department
          </option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

const CalendarGrid = () => (
  <div className="grid grid-cols-7 gap-2 text-center mb-6 text-black">
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day} className="font-bold">
        {day}
      </div>
    ))}
    <div className="p-2 text-gray-400 border border-black rounded-lg">31</div>
    <div className="p-2 border border-black rounded-lg bg-blue-400">1</div>
    <div className="p-2 border border-black rounded-lg">2</div>
    <div className="p-2 border border-black rounded-lg bg-green-400">3</div>
    <div className="p-2 border border-black rounded-lg">4</div>
    <div className="p-2 border border-black rounded-lg">5</div>
    <div className="p-2 border border-black rounded-lg">6</div>
  </div>
);

const EventList = ({filters}) => {
  const [events, setEvents] = useState([]);
  console.log("Filters - event list: ", filters)

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      console.log("Events: ", events);
      setEvents(events);
    }

    fetchData();
  }, [filters])

  return (
    <div className="mt-4 text-black">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Upcoming Events</h2>
      { events.length > 0 ? (events.map((event, index) => (
        <div key={index} className="p-4 bg-gray-50 border rounded-lg mb-2">
          <p className="font-bold text-gray-800">{event.title}</p>
          <p className="text-sm text-gray-600">
            {event.date} - {event.department}
          </p>
        </div>
      ))) : <h3>No upcoming events</h3>
    }
    </div>
  );
};

const EventCalendar = () => {
  const [filters, setFilters] = useState({})

  return (
    <div className="bg-gray-100 container p-4 sm:p-6 min-h-screen min-w-screen flex justify-center items-start ">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
          University Event Calendar
        </h1>
        <FilterSection setFilters={setFilters} filters={filters} />
        <CalendarGrid />
        <EventList filters={filters} />
      </div>
    </div>
  );
};

export default EventCalendar;