// // i am forced not to leave this page empty
// import UserCard from "@/components/common/UserCard";
// import Header from "@/components/layout/Header";
// import { UserProps } from "@/interfaces";

// const Users: React.FC<UserProps[]> = ({ posts }) => {
//   console.log(posts);
//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <main className="p-4">
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-semibold">Users</h1>
//           <button className="bg-blue-700 px-4 py-2 rounded-full text-white">
//             Add User
//           </button>
//         </div>
//         <div className="grid grid-cols-3 gap-2">
//           {/* posts?.map */}
//           {posts.map((user: UserProps) => (
//             <UserCard
//               key={user.id}
//               id={user.id}
//               name={user.name}
//               username={user.username}
//               email={user.email}
//               address={user.address}
//               phone={user.phone}
//               // website={user.website}
//               company={user.company}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const posts = await response.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

// // export default Users;

// import UserCard from "@/components/common/UserCard";
// import UserModal from "@/components/common/UserModal";
// import Header from "@/components/layout/Header";
// import { UserData, UserProps } from "@/interfaces";
// import { useState } from "react";

// const Users: React.FC<{ users: UserProps[] }> = ({ users }) => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [userList, setUserList] = useState<UserProps[]>(users);

//   const handleAddUser = (newUser: UserData) => {
//     const userWithId: UserProps = {
//       ...newUser,
//       id: userList.length + 1,
//     };
//     setUserList((prev) => [userWithId, ...prev]);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <main className="p-4">
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-semibold">Users</h1>
//           <button
//             onClick={() => setModalOpen(true)}
//             className="bg-blue-700 px-4 py-2 rounded-full text-white"
//           >
//             Add User
//           </button>
//         </div>
//         <div className="grid grid-cols-3 gap-2">
//           {userList.map((user: UserProps, key: number) => (
//             <UserCard
//               key={key}
//               id={user.id}
//               name={user.name}
//               username={user.username}
//               email={user.email}
//               address={user.address}
//               phone={user.phone}
//               website={user.website}
//               company={user.company}
//             />
//           ))}
//         </div>
//       </main>

//       {isModalOpen && (
//         <UserModal
//           onClose={() => setModalOpen(false)}
//           onSubmit={handleAddUser}
//         />
//       )}
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const posts = await response.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

// export default Users;

import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserProps } from "@/interfaces";
import { useState } from "react";

interface UsersPageProps {
  users: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ users: initialUsers }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState<UserProps[]>(initialUsers);

  const handleAddUser = (newUser: UserProps) => {
    const userWithId: UserProps = {
      ...newUser,
      id: userList.length + 1, // Generate new ID
    };
    setUserList((prev) => [userWithId, ...prev]);
    setModalOpen(false); // Close modal after adding
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors shadow-md"
          >
            + Add New User
          </button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userList.map((user: UserProps) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              address={user.address}
              phone={user.phone}
              website={user.website}
              company={user.company}
            />
          ))}
        </div>

        {/* Empty State */}
        {userList.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first user.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium"
            >
              Add First User
            </button>
          </div>
        )}
      </main>

      {/* User Modal */}
      {isModalOpen && (
        <UserModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    return {
      props: {
        users,
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [],
      },
    };
  }
}

export default Users;
