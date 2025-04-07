import { useEffect, useState } from "react";
import { createEvent, getEvents } from "../services/api";

import toast, { Toaster } from "react-hot-toast";

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
      description: "Description",
      startDate: "01/08/2005",
      endDate: "06/12/2025"
    });
  }, [setFilters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8 w-full text-gray-800">
      {/* CATEGORY */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
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
        <label htmlFor="department" className="text-sm font-medium text-gray-700 mb-1">
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
        <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
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
        <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
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

const ShowEvents = ({ filters }) => {
    const [ event, setEvents ] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getEvents(filters);
            setEvents(events)
          }
          fetchEvents()
    }, [filters])

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
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Department:</span> {event.department}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Category:</span> {event.category}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Description:</span> {event.description}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No Events Available</p>
            )}
        </div>
    );
}

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    category: "",
    department: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const notify = () => toast("Successfully Added Event")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEvent(event);
      console.log("Response: ", response);
      console.log("Response data: ", response.data);
      
      if(response.status == 200){
        console.log("Sucessful console.log response status")
        notify()
      }
      else{
        console.log(response.status)
      }

      console.log("Create event, event: ", response);
      setEvent({
        title: "",
        category: "",
        department: "",
        description: ""
      })
    } catch (error) {
      console.log("Error creating event: ", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8 text-gray-900">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            placeholder="Enter event title"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={event.category || "category"}
            name="category"
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="category" disabled>
              Category
            </option>
            <option value="General Announcements">General Announcements</option>
            <option value="Seminars">Seminars</option>
            <option value="Workshops">Workshops</option>
            <option value="Sports">Sports</option>
            <option value="Services">Services</option>
            <option value="Events">Events</option>
          </select>
        </div>

        {/* DEPARTMENT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="department"
            value={event.department || "department"}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="department" disabled>
              Department
            </option>
            <option value="General">General</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Business">Business</option>
          </select>
        </div>
        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={event.description}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            placeholder="Enter event description"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

const Event2 = () => {
    const [filters, setFilters] = useState({});

    return (
        <div className="bg-white min-h-screen min-w-screen flex flex-col mx-auto overflow-hidden">
            <FilterSection filters={filters} setFilters={setFilters}/>
            <ShowEvents filters={filters} />
            <AddEvent />
            <Toaster />
        </div>
    )
}

export default Event2;