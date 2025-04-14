import React, { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../services/api";
import { toast, Toaster } from "sonner";

const FilterSection = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilters({
      category: "Category",
      department: "Department",
      description: "Description",
      startDate: "01/08/2005",
      endDate: "06/12/2025",
    });
  }, [setFilters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8 w-full text-gray-800">
      {/* CATEGORY */}
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="category"
          value={filters.category || "Category"}
          onChange={handleFilterChange}
        >
          <option value="Category">Category</option>
          <option value="General Announcements">General Announcements</option>
          <option value="Seminars">Seminars</option>
          <option value="Workshops">Workshops</option>
          <option value="Sports">Sports</option>
          <option value="Services">Services</option>
          <option value="Events">Events</option>
        </select>
      </div>

      {/* DEPARTMENT */}
      <div className="flex flex-col">
        <label
          htmlFor="department"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Department
        </label>
        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
        >
          <option value="Department" disabled>
            Department
          </option>
          <option value="General">General</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Mathematics">Mathematics</option>
        </select>
      </div>

      {/* START DATE */}
      <div className="flex flex-col">
        <label
          htmlFor="startDate"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Start Date
        </label>
        <input
          type="date"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          placeholder="Start Date"
        />
      </div>

      {/* END DATE */}
      <div className="flex flex-col">
        <label
          htmlFor="endDate"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          End Date
        </label>
        <input
          type="date"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          placeholder="End Date"
        />
      </div>
    </div>
  );
};



const CalendarGrid = ({ events, filters }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([events]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  console.log("events: ", events);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

  useEffect(() => {
    const filterEvents = () => {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.date);

        const matchesCategory =
          filters.category === "Category" ||
          filters.category === event.category;
        const matchesDepartment =
          filters.department === "Department" ||
          filters.department === event.department;
        const matchesDateRange =
          (!filters.startDate || eventDate >= new Date(filters.startDate)) &&
          (!filters.endDate || eventDate <= new Date(filters.endDate));
        const matchesMonth =
          eventDate.getMonth() == currentMonth &&
          eventDate.getFullYear() == currentYear;

        return (
          matchesCategory &&
          matchesDepartment &&
          matchesDateRange &&
          matchesMonth
        );
      });

      setFilteredEvents(filtered);
      console.log(events)
    };

    console.log("filteredEvents: ", filteredEvents);
    filterEvents();
  }, [events, filters, currentMonth, currentMonth]);

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Generate a mock calendar for the current month (e.g., April 2025)
  const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="relative">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-lg font-bold text-gray-800">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousMonth}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mb-6 text-black">
        {/* Weekday Headers */}
        {weekArr.map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}

        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day) => {
          // Check if there are events on this day
          const dayEvents = filteredEvents.filter(
            (event) => new Date(event.date).getDate() === day
          );

          return (
            <div
              key={day}
              className={`p-2 border border-gray-300 rounded-lg ${
                dayEvents.length > 0 ? "bg-blue-100 text-gray-800" : ""
              }`}
            >
              <div className="font-bold">{day}</div>
              {dayEvents.length > 0 && (
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-blue-300 text-black text-xs rounded-md px-1 py-0.5 truncate hover:overflow-visible hover:whitespace-normal hover:bg-blue-400"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ShowEvents = ({ event, setEvent, filters }) => {
  // const [event, setEvent] = useState([]);
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    const fetchEvents = async () => {

      try {
        const events = await getEvents(filters);
        setEvent(Array.isArray(events) ? events : []);
      } catch (error) {
        console.log("Error fetching errors");
        setEvent([]);
      } finally{
        setLoading(false)
      };
    fetchEvents();
    }
  }, [filters]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteEvent(id);
      console.log("delete response: ", response);
      //lift events to paret comp
      setEvent((prevEvents) => prevEvents.filter((event) => event._id !== id));
      toast.message("Event deleted");
    } catch (error) {
      console.log("delete event error: ", error);
    }
  };

  // if (loading){
  //   return <p className="text-black"> Loading state</p>
  // } 
    return (
  
        <div className="text-black mt-6 w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Show Events</h1>
      {event.length > 0 ? (
        <div className="flex flex-col w-full">
          {event.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full"
            >
              <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
              <p className="text-black">checkers if its there</p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Department:</span>{" "}
                {event.department}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Category:</span> {event.category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Description:</span>{" "}
                {event.description}
              </p>
              <button
                onClick={() => handleDelete(event._id)}
                className="text-white bg-white border-4 hover:border-white rounded-2xl "
              >
                {" "}
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : <p className="text-center text-gray-500">No events found.</p>}
    </div>
  );
  }


const EventCalendar = () => {
  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents(filters);
        console.log("In EventCalendar events: ", events);
        setEvents(res);
      } catch (error) {
        console.log("Error getting events: ", error);
      }
    };
    fetchEvents()
  }, []);

  return (
    <div className="mt-12 bg-gray-100 container p-4 sm:p-6 min-h-screen min-w-screen flex justify-center items-start ">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <Toaster />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
          University Event Calendar
        </h1>
        <FilterSection setFilters={setFilters} filters={filters} />
        <CalendarGrid events={events} filters={filters} />
        <ShowEvents filters={filters} event={events} setEvent={setEvents}/>
      </div>
    </div>
  );
};

export default EventCalendar;
