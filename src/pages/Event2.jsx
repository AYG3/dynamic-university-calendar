import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

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
        <option value="General Announcements">General Announcements</option>
        <option value="Seminars">Seminars</option>
        <option value="Workshops">Workshops</option>
        <option value="Sports">Sports</option>
        <option value="Services">Services</option>
        <option value="Events">Events</option>
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
        <option value="General">General</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Engineering">Engineering</option>
        <option value="Business">Business</option>
        <option value="Mathematics">Mathematics</option>
        {/* enum: ["General", "Computer Science", "Mathematics", "Engineering", "Business"] */}
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
                <div className="flex w-full justify-center items-center">
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
  const [ event, setEvent ] = useState({
    title: "",
    category: "",
    department: ""
  })

  const handleInputChange = (e) => {
    const {name, value} = 
    setEvent((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className="border-2 border-amber-400 w-full text text-black">
      <h2>Add Event</h2>

      <div>
        <label>Event title</label>
        <input type="text" name="title" value={event} />
      </div>
    </div>
  )
}
const Event2 = () => {
    const [filters, setFilters] = useState({});

    return (
        <div className="bg-white min-h-screen min-w-screen flex flex-col mx-auto overflow-hidden">
            <FilterSection filters={filters} setFilters={setFilters}/>
            <ShowEvents filters={filters} />
            <AddEvent />
        </div>
    )
}

export default Event2;