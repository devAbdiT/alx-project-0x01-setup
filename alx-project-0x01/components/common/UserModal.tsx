// import { UserData, UserModalProps } from "@/interfaces";
// import React, { useState } from "react";

// const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
//   const [user, setUser] = useState<UserData>({
//     name: "",
//     username: "",
//     email: "",
//     address: {
//       street: "",
//       suite: "",
//       city: "",
//       zipcode: "",
//       geo: {
//         lat: "",
//         lng: "",
//       },
//     },
//     phone: "",
//     website: "",
//     company: {
//       name: "",
//       catchPhrase: "",
//       bs: "",
//     },
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     if (name.startsWith("address.")) {
//       const field = name.split(".")[1];
//       setUser((prev) => ({
//         ...prev,
//         address: { ...prev.address, [field]: value },
//       }));
//     } else if (name.startsWith("company.")) {
//       const field = name.split(".")[1];
//       setUser((prev) => ({
//         ...prev,
//         company: { ...prev.company, [field]: value },
//       }));
//     } else {
//       setUser((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(user);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={user.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={user.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">
//               Website
//             </label>
//             <input
//               type="text"
//               name="website"
//               value={user.website}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               Add User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserModal;

import { UserProps, UserModalProps } from "@/interfaces";
import React, { useState } from "react";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserProps>({
    id: 0, // Will be generated or passed if editing
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  // Handle basic field changes (name, email, username, etc.)
  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle address field changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  // Handle company field changes
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      company: {
        ...prevUser.company,
        [name]: value,
      },
    }));
  };

  // Handle geo location changes
  const handleGeoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        geo: {
          ...prevUser.address.geo,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-red-900 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleBasicChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleBasicChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleBasicChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleBasicChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={user.website}
                  onChange={handleBasicChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="street"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={user.address.street}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter street"
                />
              </div>

              <div>
                <label
                  htmlFor="suite"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Suite/Apartment
                </label>
                <input
                  type="text"
                  id="suite"
                  name="suite"
                  value={user.address.suite}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter suite or apartment"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-medium mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={user.address.city}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Zipcode
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={user.address.zipcode}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter zipcode"
                />
              </div>

              {/* Geo Location */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="lat"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="lat"
                    name="lat"
                    value={user.address.geo.lat}
                    onChange={handleGeoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter latitude"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lng"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="lng"
                    name="lng"
                    value={user.address.geo.lng}
                    onChange={handleGeoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter longitude"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="name"
                  value={user.company.name}
                  onChange={handleCompanyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label
                  htmlFor="catchPhrase"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Catch Phrase
                </label>
                <input
                  type="text"
                  id="catchPhrase"
                  name="catchPhrase"
                  value={user.company.catchPhrase}
                  onChange={handleCompanyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter catch phrase"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="bs"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Business
                </label>
                <input
                  type="text"
                  id="bs"
                  name="bs"
                  value={user.company.bs}
                  onChange={handleCompanyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter business description"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
