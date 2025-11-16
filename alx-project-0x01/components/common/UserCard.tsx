import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({
  name,
  username,
  email,
  phone,
  address,
}) => {
  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">@{username}</p>
      </div>
      <p className="text-gray-600">{email}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Phone: {phone}</span>
        <span>City: {address.city}</span>
      </div>
    </div>
  );
};

export default UserCard;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}
