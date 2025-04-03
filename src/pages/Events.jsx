import React, { use, useEffect, useState } from "react";
import { getEvents } from "../services/api";


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
    <div>
        <div className="bg-gray-400 text-gray-700 flex justify-center rounded-2xl">
            <h3 className="text-3xl">Filter</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 w-full text-black">
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
        <div className="flex flex-col">
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
            Start Date
            </label>
            <input
            type="date"
            className="p-2 border rounded-lg w-full"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Start Date"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
            End Date
            </label>
            <input
            type="date"
            className="p-2 border rounded-lg w-full"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="End Date"
            />
        </div>
        </div>
    </div>
  );
};


const ShowEvents = ({ filters }) => {
  const [events, setEvents] = useState([]);
  console.log("Filters - event list: ", filters)

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents(filters);
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

const AddEvent = () => {
    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        department: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createEvent(eventData);
            console.log("Event created successfully:", response);
            setEventData({ title: "", date: "", department: "" });
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-black">
            <h2 className="text-lg font-semibold mb-4">Add Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-black">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Event Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventData.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-lg w-full"
                        placeholder="Enter event title"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-lg w-full"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Department
                    </label>
                    <select
                        id="department"
                        name="department"
                        value={eventData.department}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-lg w-full"
                        required
                    >
                        <option value="" disabled>
                            Select department
                        </option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                    >
                        category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={eventData.category}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-lg w-full"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        description
                    </label>
                    <select
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-lg w-full"
                    >
                        <option value="" disabled>
                            Select description
                        </option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
};


const Events = () => {
    const [ filters, setFilters ] = useState({})

    return (
        <div className="w-full min-w-screen min-h-screen bg-white px-6">
            <FilterSection filters={filters} setFilters={setFilters}/>
            <ShowEvents filters={filters}/>
            <AddEvent />
        </div>
    )
}

export default Events;