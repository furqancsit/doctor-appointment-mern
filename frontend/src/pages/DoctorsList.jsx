import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";

export default function DoctorsList({ showSearch = true }) {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDoctors = useCallback(async (searchText = "", signal) => {
    try {
      setLoading(true);

      const res = await axios.get("/api/v1/doctor/search", {
        params: { search: searchText },
        signal,
      });

      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.name !== "CanceledError") {
        setDoctors([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      fetchDoctors(search.trim(), controller.signal);
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, fetchDoctors]);

  return (
    <section className="min-h-screen  pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Find Your Doctor
          </h1>
          <p className="text-gray-500 mt-2">
            Search, compare and book appointments with trusted doctors
          </p>
        </div>

        {/* SEARCH CARD */}
        {showSearch && (
          <div className="bg-white shadow-md rounded-2xl p-4 max-w-2xl mx-auto mb-10 border">
            <SearchInput search={search} setSearch={setSearch} />
          </div>
        )}

        {/* STATES */}
        {loading && (
          <div className="text-center mt-10">
            <div className="inline-block animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="text-gray-500 mt-2">Loading doctors...</p>
          </div>
        )}

        {!loading && doctors.length === 0 && (
          <div className="text-center mt-10 bg-white p-6 rounded-2xl shadow-sm max-w-md mx-auto">
            <p className="text-gray-500">No doctors found</p>
          </div>
        )}

        {/* DOCTOR GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => navigate(`/doctor/details/${doctor._id}`)}
              className="group cursor-pointer rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {doctor.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Dr. {doctor.name}
                    </h2>

                    <p className="mt-1 text-blue-600 font-medium">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${doctor.isAvailable
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                    }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${doctor.isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                  />

                  {doctor.isAvailable ? "Available" : "Busy"}
                </div>
              </div>

              {/* Info */}

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Experience
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {doctor.experience} Years
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-blue-500">
                    Consultation
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-blue-700">
                    ₹{doctor.fee}
                  </h3>
                </div>
              </div>

              {/* Days */}

              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Available Days
                </p>

                <div className="flex flex-wrap gap-2">
                  {doctor.availability?.map((day) => (
                    <span
                      key={day.day}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {day.day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slots */}

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Next Slots
                </p>

                <div className="flex flex-wrap gap-2">
                  {doctor.availability?.[0]?.slots
                    ?.slice(0, 3)
                    .map((slot) => (
                      <span
                        key={slot}
                        className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                      >
                        {slot}
                      </span>
                    ))}
                </div>
              </div>

              {/* Button */}

              <button
                disabled={!doctor.isAvailable}
                className={`mt-8 w-full rounded-2xl py-3 font-semibold transition-all ${doctor.isAvailable
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer group-hover:shadow-lg  "
                  : "bg-gray-100 text-gray-400 "
                  }`}
              >
                View Profile & Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}