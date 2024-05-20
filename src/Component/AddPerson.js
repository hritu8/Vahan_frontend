import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import "./AddPerson.css";

const AddPerson = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    MobileNumber: "",
    DateOfBirth: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/add", formData);
      navigate("/");
    } catch (error) {
    }
  };

  return (
    <div class="bg-gray-200 p-6 rounded-lg shadow-md w-1/4 m-auto mt-20">
      <h1 class="text-2xl font-bold mb-6">Add Person</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Full Name:</label>
          <input
            type="text"
            name="Name"
            onChange={handleChange}
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">
            Mobile Number:
          </label>
          <input
            type="text"
            name="MobileNumber"
            onChange={handleChange}
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">DOB:</label>
          <input
            type="date"
            id="DateOfBirth"
            name="DateOfBirth"
            onChange={handleChange}
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Person
        </button>
      </form>
    </div>
  );
};

export default AddPerson;
