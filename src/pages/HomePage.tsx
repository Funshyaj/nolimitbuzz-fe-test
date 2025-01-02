import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";

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
    return <div className="text-center mt-20 text-lg">Loading users...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">User List</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <Link
              to={`/user/${user.id}`}
              className="mt-4 text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
