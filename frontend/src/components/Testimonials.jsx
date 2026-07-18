import React from "react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Patient",
    review:
      "Booking an appointment was super easy. I found a great cardiologist within minutes!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Priya Verma",
    role: "Patient",
    review:
      "Very smooth experience. The doctor was on time and the consultation was excellent.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Rahul Patil",
    role: "Patient",
    review:
      "I liked how quickly I could filter doctors by specialty and book an appointment.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=45",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-slate-50 via-white to-blue-50">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-flex px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900">
            Loved by
            <span className="block text-blue-600">
              Thousands of Patients
            </span>
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Discover why patients trust our platform to connect with
            experienced doctors and book appointments effortlessly.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Quote */}
              <div className="absolute top-5 right-6 text-7xl text-blue-100 font-serif leading-none">
                "
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < item.rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                      }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review */}
              <p className="relative text-gray-600 leading-8">
                {item.review}
              </p>

              {/* Divider */}
              <div className="my-7 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* User */}
              <div className="flex items-center gap-4">

                <div className="relative">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-100"
                  />

                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
                </div>

                <div className="text-left">
                  <h4 className="font-bold text-lg text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>

              </div>

              {/* Bottom Accent */}
              <div className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 group-hover:w-28" />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Testimonials;