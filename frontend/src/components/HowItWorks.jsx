import React from "react";

const steps = [
  {
    id: 1,
    title: "Search Doctor",
    desc: "Find doctors by specialty, name, or location.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "View Profile",
    desc: "Check doctor experience, reviews, and availability.",
    icon: "👨‍⚕️",
  },
  {
    id: 3,
    title: "Choose Time Slot",
    desc: "Select a convenient date and time for your appointment.",
    icon: "🗓️",
  },
  {
    id: 4,
    title: "Book Appointment",
    desc: "Confirm your booking in just one click.",
    icon: "✅",
  },
];
const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search Doctor",
      desc: "Find the right specialist based on your needs",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Choose Slot",
      desc: "Pick a convenient date and time",
      icon: "📅",
    },
    {
      id: 3,
      title: "Book Appointment",
      desc: "Confirm your booking in seconds",
      icon: "📝",
    },
    {
      id: 4,
      title: "Visit Doctor",
      desc: "Meet your doctor at the scheduled time",
      icon: "👨‍⚕️",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50 py-24 px-6">
      {/* Background Blur */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Book Your Appointment
            <span className="block text-blue-600">In Just 4 Steps</span>
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Find the best doctors, choose your preferred time, and confirm
            your appointment within minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 relative">

          {/* Connector Line */}
          <div className="hidden md:block absolute top-20 left-[10%] right-[10%] border-t-2 border-dashed border-blue-200" />

          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative"
            >
              {/* Step Number */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition">
                  {step.id}
                </div>
              </div>

              {/* Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-lg p-8 text-center transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-5xl shadow-inner group-hover:rotate-6 group-hover:scale-110 transition duration-300">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                  {step.desc}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto group-hover:w-24 transition-all duration-300" />
              </div>

              {/* Arrow */}
              {step.id !== steps.length && (
                <div className="hidden md:flex absolute top-20 -right-7 items-center justify-center text-blue-400 text-3xl font-light">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default HowItWorks;