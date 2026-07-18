import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaCalendarCheck,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

export default function Hero() {
  return (
  <section className="relative overflow-hidden pt-36 pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

    {/* Background Blobs */}
    <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-500/10 blur-[140px]" />
    <div className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-cyan-400/10 blur-[160px]" />

    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

      {/* LEFT */}
      <div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-xl shadow-sm text-sm font-medium text-slate-600 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Trusted by 10,000+ Patients Worldwide
        </div>

        {/* Heading */}
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-slate-900">
          Healthcare
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-semibold">
            made simple.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-7 text-lg leading-8 text-slate-600 max-w-xl">
          Find trusted specialists, schedule appointments instantly,
          and manage your healthcare journey with a modern, seamless experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-10">

          <Link
            to="/doctors"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl shadow-blue-500/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            Book Appointment
            <FaArrowRight />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300"
          >
            Explore Services
          </Link>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16">

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-4xl font-bold text-slate-900">500+</h2>
            <p className="mt-1 text-slate-500">Expert Doctors</p>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-4xl font-bold text-slate-900">10K+</h2>
            <p className="mt-1 text-slate-500">Patients</p>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-4xl font-bold text-slate-900">98%</h2>
            <p className="mt-1 text-slate-500">Satisfaction</p>
          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="relative flex justify-center">

        <img
          src="https://media.istockphoto.com/id/517051420/photo/portrait-an-unknown-male-doctor-holding-a-stethoscope-behind.webp?a=1&b=1&s=612x612&w=0&k=20&c=VzOIvN6lhEfGR2v16vDZ1w0qByBJ7X0XpdvO1ffr0pk="
          alt="Doctor"
          className="w-full max-w-xl rounded-[40px] shadow-2xl object-cover border border-white/40"
        />

        {/* Floating Card 1 */}
        <div className="absolute top-10 -left-10 hidden lg:flex items-center gap-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <FaCalendarCheck />
          </div>

          <div>
            <p className="text-sm text-slate-500">Appointments</p>
            <h3 className="font-bold text-xl text-slate-900">120 Today</h3>
          </div>

        </div>

        {/* Floating Card 2 */}
        <div className="absolute bottom-10 -right-10 hidden lg:flex items-center gap-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <FaStar />
          </div>

          <div>
            <p className="text-sm text-slate-500">Patient Rating</p>
            <h3 className="font-bold text-xl text-slate-900">4.9 / 5</h3>
          </div>

        </div>

        {/* Floating Card 3 */}
        <div className="absolute bottom-1/2 -left-14 hidden xl:flex items-center gap-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600">
            <FaUserMd />
          </div>

          <div>
            <p className="text-sm text-slate-500">Specialists</p>
            <h3 className="font-bold text-xl text-slate-900">500+</h3>
          </div>

        </div>

      </div>

    </div>

  </section>
);
}