import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importing useParams
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import axios from "axios";
// import "./UpdatePerson.css";

const UpdatePerson = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    MobileNumber: "",
    DateOfBirth: "",
  });

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-one/${params.Email}`
        );
        const personData = response.data;
        // Parse and format the date of birth
        const dobDate = new Date(personData.DateOfBirth);
        const formattedDOB = `${dobDate.getDate()}/${
          dobDate.getMonth() + 1
        }/${dobDate.getFullYear()}`;
        // Update the state with formatted DOB
        setFormData({ ...personData, DateOfBirth: formattedDOB });
      } catch (error) {
      }
    };
    fetchPerson();
  }, [params.Email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/update/${params.Email}`, formData);
      navigate("/");
    } catch (error) {
    }
  };

  return (
    <div class="bg-gray-200 p-6 rounded-lg shadow-md w-1/4 m-auto mt-20">
      <h1 class="text-2xl font-bold mb-6">Update Person</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Full Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            class="appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="text"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            class="appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">
            Mobile Number:
          </label>
          <input
            type="text"
            name="MobileNumber"
            value={formData.MobileNumber}
            onChange={handleChange}
            class="appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Person
        </button>
      </form>
    </div>
  );
};

export default UpdatePerson;
