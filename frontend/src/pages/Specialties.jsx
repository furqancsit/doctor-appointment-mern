import React from "react";

const specialties = [
  { name: "General Physician", icon: "🩺" },
  { name: "Dentist", icon: "🦷" },
  { name: "Dermatologist", icon: "🧴" },
  { name: "Pediatrician", icon: "👶" },
  { name: "Cardiologist", icon: "❤️" },
  { name: "Neurologist", icon: "🧠" },
  { name: "Orthopedic", icon: "🦴" },
  { name: "ENT Specialist", icon: "👂" },
];

const Specialties = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Browse by Specialties
        </h2>
        <p className="text-gray-500 mt-2">
          Find the right doctor for your health needs
        </p>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {specialties.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center cursor-pointer hover:scale-105 duration-200"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-3 text-gray-700 font-medium text-sm md:text-base">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;