import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";
import { ImSpinner9 } from "react-icons/im";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 h-screen w-full flex flex-col gap-2 items-center justify-center">
        <ImSpinner9 className="animate-spin text-blue-500" size={60} />
        <p>Fetching all users...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Users List</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-">
              <strong>Username: </strong>
              {user.username}
            </p>
            <p className="text-">
              <strong>Email: </strong>
              {user.email}
            </p>
            <div className="mt-4 flex">
              <Link
                to={`/user/${user.id}`}
                className="flex items-center gap-1 rounded-md text-white bg-blue-500 px-3 py-1 text-lg "
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
