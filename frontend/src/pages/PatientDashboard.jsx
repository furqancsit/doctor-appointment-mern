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
  <div className="min-h-screen bg-slate-50 pt-24 pb-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Patient Dashboard
          </p>

          <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Manage your appointments and healthcare information.
          </p>
        </div>

        <Link
          to="/doctors"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          <CalendarPlus size={18} />
          Book Appointment
        </Link>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {appointments.length}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Appointments
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-amber-200 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Upcoming
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {
                  appointments.filter(
                    (a) =>
                      a.status !== "completed" &&
                      a.status !== "cancelled"
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Pending visits
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Clock3 className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {
                  appointments.filter(
                    (a) => a.status === "completed"
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Finished visits
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Cancelled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-red-200 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Cancelled
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {
                  appointments.filter(
                    (a) => a.status === "cancelled"
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Cancelled visits
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* ================= APPOINTMENTS ================= */}
        <div className="min-w-0">

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Your appointments
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View and manage your consultations.
              </p>
            </div>

            <span className="text-xs font-medium text-slate-400">
              {appointments.length} total
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <CalendarDays className="h-7 w-7 text-blue-600" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                No appointments yet
              </h3>

              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                Book your first consultation with a doctor to get started.
              </p>

              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                <CalendarPlus size={17} />
                Find a doctor
              </Link>
            </div>
          ) : (
            <div className="space-y-3">

              {appointments.map((a) => (
                <div
                  key={a._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-5">

                    {/* Doctor */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <User className="h-6 w-6" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 truncate">
                            Dr. {a.doctor?.name}
                          </h3>

                          <p className="text-sm text-slate-500 truncate">
                            {a.doctor?.specialization}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusBadge(
                          a.status
                        )}`}
                      >
                        {a.status}
                      </span>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid sm:grid-cols-2 gap-3">

                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                        <CalendarDays className="h-4 w-4 text-blue-600" />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Date
                          </p>

                          <p className="text-sm font-medium text-slate-700">
                            {new Date(a.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                        <Clock className="h-4 w-4 text-blue-600" />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Time
                          </p>

                          <p className="text-sm font-medium text-slate-700">
                            {a.time}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">

                      <button
                        onClick={() => {
                          setSelectedDoctor(a.doctor);
                          setIsModalOpen(true);
                        }}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                      >
                        View doctor
                      </button>

                      <button
                        onClick={() => handleCancel(a._id)}
                        disabled={
                          a.status === "cancelled" ||
                          a.status === "completed"
                        }
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          a.status === "cancelled" ||
                          a.status === "completed"
                            ? "cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-400"
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
              ))}
            </div>
          )}
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="space-y-4 lg:sticky lg:top-24">

          {/* Next Appointment */}
          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <CalendarDays size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  NEXT APPOINTMENT
                </p>

                <h3 className="text-sm font-semibold text-white">
                  Upcoming visit
                </h3>
              </div>
            </div>

            {appointments.length > 0 ? (
              <>
                <div className="mt-6">
                  <p className="text-xl font-bold">
                    Dr. {appointments[0].doctor?.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {appointments[0].doctor?.specialization}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">

                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-[11px] text-slate-400">
                      DATE
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {new Date(
                        appointments[0].date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-[11px] text-slate-400">
                      TIME
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {appointments[0].time}
                    </p>
                  </div>

                </div>
              </>
            ) : (
              <p className="mt-6 text-sm text-slate-400">
                No upcoming appointments.
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Quick actions
            </h3>

            <div className="space-y-2">

              <Link
                to="/doctors"
                className="flex w-full items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <span className="flex items-center gap-2">
                  <CalendarPlus size={17} />
                  Book appointment
                </span>

                <ArrowRight size={16} />
              </Link>

              <Link
                to="/doctors"
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <UserRound size={17} />
                  View doctors
                </span>

                <ArrowRight size={16} />
              </Link>

              <button
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <FileText size={17} />
                  Medical history
                </span>

                <ArrowRight size={16} />
              </button>

            </div>
          </div>

          {/* Health Tip */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                <HeartPulse className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-emerald-800">
                  Health tip
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-emerald-700">
                  Stay hydrated and aim for at least 30 minutes of physical
                  activity each day.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    {/* ================= DOCTOR MODAL ================= */}
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
