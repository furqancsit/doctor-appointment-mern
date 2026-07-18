import axios from "axios";
import { useEffect, useState } from "react";
import DoctorModal from "../components/DoctorModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  XCircle,
  Clock3,
  UserRound,
  Stethoscope,
  ArrowRight,
  HeartPulse,
  FileText,
  Activity,
  User,
  Clock,
} from "lucide-react";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/appointment/my", {
          withCredentials: true,
        });
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const canCancel = (appointmentDate) => {
    const diffHours =
      (new Date(appointmentDate) - new Date()) / (1000 * 60 * 60);

    return diffHours >= 6;
  };

  const handleCancel = async (id) => {
    const prev = [...appointments];
    try {
      // optimistic update
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a)),
      );

      await axios.patch(
        `/api/v1/appointment/cancel/${id}`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel appointment");
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">Dashboard</p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your appointments and healthcare information.
            </p>
          </div>

          <Link
            to="/doctors"
            className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Book Appointment
          </Link>
        </div>

        {/* Stats */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-10">
          {/* Total */}

          <div className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Appointments</p>

                <h2 className="mt-3 text-4xl font-bold">
                  {appointments.length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <CalendarDays className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Upcoming */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Upcoming</p>

                <h2 className="mt-3 text-4xl font-bold">
                  {
                    appointments.filter(
                      (a) =>
                        a.status !== "completed" && a.status !== "cancelled",
                    ).length
                  }
                </h2>
              </div>

              <Clock3 size={34} />
            </div>
          </div>

          {/* Completed */}

          <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Completed</p>

                <h2 className="mt-3 text-4xl font-bold">
                  {appointments.filter((a) => a.status === "completed").length}
                </h2>
              </div>

              <CheckCircle2 size={34} />
            </div>
          </div>

          {/* Cancelled */}

          <div className="rounded-3xl bg-gradient-to-r from-red-500 to-rose-600 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Cancelled</p>

                <h2 className="mt-3 text-4xl font-bold">
                  {appointments.filter((a) => a.status === "cancelled").length}
                </h2>
              </div>

              <XCircle size={34} />
            </div>
          </div>
        </div>

        {/* Main Content */}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left */}

          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800">
              Upcoming Appointments
            </h2>

            {appointments.length === 0 ? (
              <div className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl py-20 text-center shadow-xl">
                <Activity className="mx-auto h-16 w-16 text-blue-500" />

                <h3 className="mt-5 text-2xl font-bold text-slate-800">
                  No Appointments
                </h3>

                <p className="mt-2 text-slate-500">
                  Schedule your first consultation.
                </p>
              </div>
            ) : (
              appointments.map((a) => (
                <div
                  key={a._id}
                  className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                        <User className="h-8 w-8" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          Dr. {a.doctor?.name}
                        </h3>

                        <p className="text-slate-500">
                          {a.doctor?.specialization}
                        </p>

                        <span
                          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(a.status)}`}
                        >
                          {a.status}
                        </span>
                      </div>
                    </div>

                    {/* Center */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays className="h-5 w-5 text-blue-500" />
                        <span>{new Date(a.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-5 w-5 text-cyan-500" />
                        <span>{a.time}</span>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedDoctor(a.doctor);
                          setIsModalOpen(true);
                        }}
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleCancel(a._id)}
                        disabled={
                          a.status === "cancelled" || a.status === "completed"
                        }
                        className={`rounded-xl px-5 py-2 font-medium transition ${
                          a.status === "cancelled" || a.status === "completed"
                            ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
                            : "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {a.status === "cancelled"
                          ? "Cancelled"
                          : a.status === "completed"
                            ? "Completed"
                            : "Cancel"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}

          <div className="space-y-6">
            {/* Next Appointment */}

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 p-7 text-white shadow-2xl">
              <div className="flex items-center gap-3">
                <CalendarDays />

                <h3 className="text-lg font-semibold">Next Appointment</h3>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h2 className="mt-6 text-3xl font-bold">
                    Dr. {appointments[0].doctor?.name}
                  </h2>

                  <p className="mt-3 opacity-90">
                    {appointments[0].appointmentDate}
                  </p>

                  <p className="opacity-90">{appointments[0].slot}</p>
                </>
              ) : (
                <p className="mt-6 opacity-90">No upcoming appointments.</p>
              )}
            </div>

            {/* Quick Actions */}

            <div className="rounded-3xl border border-white/50 bg-white/80 p-6 backdrop-blur-xl shadow-xl">
              <h3 className="mb-5 text-lg font-semibold">Quick Actions</h3>

              <div className="space-y-3">
                <button className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white transition hover:shadow-xl">
                  <span className="flex items-center gap-2">
                    <CalendarPlus size={18} />
                    Book Appointment
                  </span>

                  <ArrowRight size={18} />
                </button>

                <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:bg-slate-50">
                  <span className="flex items-center gap-2">
                    <UserRound size={18} />
                    View Doctors
                  </span>

                  <ArrowRight size={18} />
                </button>

                <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:bg-slate-50">
                  <span className="flex items-center gap-2">
                    <FileText size={18} />
                    Medical History
                  </span>

                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Health Tip */}

            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 shadow-lg">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                  <HeartPulse className="text-emerald-600" />
                </div>

                <div>
                  <h3 className="font-bold text-emerald-700">Health Tip</h3>

                  <p className="mt-2 text-sm leading-6 text-emerald-600">
                    Drink at least 8 glasses of water daily and get 30 minutes
                    of physical activity to improve your overall health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDoctor(null);
          }}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
