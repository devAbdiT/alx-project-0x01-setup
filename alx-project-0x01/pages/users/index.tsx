// // i am forced not to leave this page empty
// import UserCard from "@/components/common/UserCard";
// import Header from "@/components/layout/Header";
// import { UserProps } from "@/interfaces";

// const Users: React.FC<UserProps[]> = ({ posts }) => {
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
//               website={user.website}
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

// export default Users;

import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserData, UserProps } from "@/interfaces";
import { useState } from "react";

const Users: React.FC<{ users: UserProps[] }> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState<UserProps[]>(users);

  const handleAddUser = (newUser: UserData) => {
    const userWithId: UserProps = {
      ...newUser,
      id: userList.length + 1,
    };
    setUserList((prev) => [userWithId, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {userList.map((user: UserProps, key: number) => (
            <UserCard
              key={key}
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
      </main>

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
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;
