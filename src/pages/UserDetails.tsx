import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { User } from "../types";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg">Loading user details...</div>
    );
  }

  if (!user) {
    return <div className="text-center mt-20 text-lg">User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        {user.name}'s Details
      </h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address.suite}, {user.address.street},{" "}
          {user.address.city}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {user.website}
          </a>
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <div className="mt-4 flex">
          <Link
            to="/"
            className="flex items-center gap-1 rounded-md text-white bg-blue-500 px-3 py-1 text-lg "
          >
            <BiArrowBack size={24} />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
