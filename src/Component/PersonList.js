import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import "./PersonList.css";

const PersonList = () => {
  const [person, setPerson] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPerson = async () => {
      axios
        .get("http://localhost:8080")
        .then((res) => setPerson(res.data))
        .catch((err) => console.log("home", err));
    };
    fetchPerson();
  }, []);

  // const handleSearch = (e) => {
  //     setSearchTerm(e.target.value);
  // };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${email}`);
      const updatedPerson = person.filter((p) => p.Email !== email);
      setPerson(updatedPerson);
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // const filteredPerson = person.filter((p) => {
  //     return p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <div className="">
      <h1 className="font-bold text-4xl">Person List</h1>
      <div className="bg-green-500 w-[120px] rounded-lg h-[40px] flex m-auto mt-2">
        <Link to="/add-person" className="text-xl items-center p-1">
          Add Person
        </Link>
      </div>

      {/* <div>
                <label>
                    Search:
                    <input type="text" onChange={handleSearch} />
                </label>
            </div> */}

      <table class="w-full mt-3 ">
        <thead class="bg-gray-50 sticky top-0 shadow-md">
          <tr>
            <th class=" px-24 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%] ">
              Name
            </th>
            <th class=" px-24 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%] ">
              Email
            </th>
            <th class=" pl-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-[17%] ">
              Mobile Number
            </th>
            <th class=" px-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[17%] ">
              Date of Birth
            </th>
            <th class=" px-24 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%] ">
              Modify
            </th>
            <th class=" px-24 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  w-[10%]">
              Delete
            </th>
          </tr>
        </thead>

        <tbody class="bg-white   shadow-md">
          {person.map((p) => (
            <tr
              key={p.Email}
              onClick={() => setCurrentRow(p.Email)}
              className={`cursor-pointer ${
                currentRow === p.Email ? "bg-blue-100" : ""
              } hover:bg-blue-200 shadow-md`}
            >
              <td class="px-14 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{p.Name}</div>
              </td>
              <td class="px-14 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{p.Email}</div>
              </td>
              <td class="px-14 py-4 whitespace-nowrap border-r border-gray-200">
                <div class="text-sm text-gray-900">{p.MobileNumber}</div>
              </td>
              <td class="px-14 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {formatDate(p.DateOfBirth)}
                </div>
              </td>
              <td class="px-14 py-4 whitespace-nowrap ">
                <button class="text-gray-600 hover:bg-gray-200 bg-gray-100 px-[12px] py-[8px] rounded-lg">
                  <Link to={`/update-person/${p.Email}`}>Modify</Link>
                </button>
              </td>
              <td class="px-14 py-4 whitespace-nowrap">
                <button
                  class="text-gray-600 hover:bg-gray-200 bg-gray-100 px-[12px] py-[8px] rounded-lg "
                  onClick={() => handleDelete(p.Email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonList;
