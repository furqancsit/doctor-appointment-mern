import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-24 px-4 md:px-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" />

      {/* Glow blobs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-blue-400/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-cyan-300/20 blur-[160px] rounded-full" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm text-sm font-medium text-slate-600 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Instant Healthcare Access
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Need a Doctor{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Right Now?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-600 mt-5 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Book your appointment in seconds and get expert medical care without
          waiting in long queues.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link to={user ? "/doctors" : "/login"}>
            <button className="group inline-flex  items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl shadow-blue-500/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              Book Appointment Now
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
