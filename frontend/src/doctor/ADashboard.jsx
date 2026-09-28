import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CalendarDays,
  Users,
  Clock4,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Stethoscope,
  Clock3,
  CalendarClock,
} from "lucide-react";

import { Link } from "react-router-dom";
const ADashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patients, setPatients] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/api/v1/doctor/dashboard", {
        withCredentials: true,
      });

      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getMyAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/appointment/doctor/appointment", {
        withCredentials: true,
      });

      setPatients(res.data.appointments || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `/api/v1/appointment/${id}/status`,
        { status },
        {
          withCredentials: true,
        },
      );

      // Update local state
      setPatients((prev) =>
        prev.map((patient) =>
          patient._id === id ? { ...patient, status } : patient,
        ),
      );

      // Refresh dashboard counts
      fetchDashboard();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchDashboard();
    getMyAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white mt-16 p-8 rounded-2xl shadow-lg text-center">
          <Activity
            className="mx-auto animate-spin text-blue-600 mb-3"
            size={35}
          />
          <p className="font-semibold text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <AlertCircle className="mx-auto text-red-500 mb-3" size={35} />
          <p className="font-semibold text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-50 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Doctor Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor appointments, patients, and your practice activity.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          Overview
        </div>
      </div>

      {/* ================= MAIN STATS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

        {/* Total Appointments */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200 hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
              <CalendarDays className="h-4 w-4 text-blue-600" />
            </div>

            <span className="text-xs text-slate-400">
              Total
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold text-slate-900">
            {data?.totalAppointments ?? 0}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Appointments
          </p>
        </div>

        {/* Patients */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-200 hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
              <Users className="h-4 w-4 text-emerald-600" />
            </div>

            <span className="text-xs text-slate-400">
              Total
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold text-slate-900">
            {data?.totalPatients ?? 0}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Patients
          </p>
        </div>

        {/* Today */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-violet-200 hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
              <Clock3 className="h-4 w-4 text-violet-600" />
            </div>

            <span className="text-xs text-slate-400">
              Today
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold text-slate-900">
            {data?.todayAppointments ?? 0}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Appointments
          </p>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-amber-200 hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
              <CalendarClock className="h-4 w-4 text-amber-600" />
            </div>

            <span className="text-xs text-slate-400">
              Scheduled
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold text-slate-900">
            {data?.upcomingAppointments ?? 0}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upcoming
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-200 hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
              <Clock4 className="h-4 w-4 text-orange-600" />
            </div>

            <span className="text-xs text-slate-400">
              Action needed
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold text-slate-900">
            {data?.statusCount?.pending ?? 0}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Pending
          </p>
        </div>

      </div>

      {/* ================= STATUS OVERVIEW ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white mb-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Appointment status
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Current appointment distribution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">

          {/* Pending */}
          <div className="flex items-center gap-3 p-5 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />

            <div>
              <p className="text-xs text-slate-500">
                Pending
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {data?.statusCount?.pending ?? 0}
              </p>
            </div>
          </div>

          {/* Approved */}
          <div className="flex items-center gap-3 p-5 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <div>
              <p className="text-xs text-slate-500">
                Approved
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {data?.statusCount?.approved ?? 0}
              </p>
            </div>
          </div>

          {/* Completed */}
          <div className="flex items-center gap-3 p-5 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

            <div>
              <p className="text-xs text-slate-500">
                Completed
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {data?.statusCount?.completed ?? 0}
              </p>
            </div>
          </div>

          {/* Cancelled */}
          <div className="flex items-center gap-3 p-5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />

            <div>
              <p className="text-xs text-slate-500">
                Cancelled
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {data?.statusCount?.cancelled ?? 0}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= PATIENTS ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">

        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-5 border-b border-slate-100">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent patients
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Latest appointment records and patient information.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              {patients?.length ?? 0} records
            </span>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left">

                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Patient
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Age
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Gender
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Phone
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Appointment
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Slot
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Reason
                </th>

                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {patients?.length > 0 ? (
                patients.map((item) => {

                  const patientName =
                    item.patientDetails?.name ||
                    item.patient?.name ||
                    "Unknown Patient";

                  const patientEmail =
                    item.patient?.email ||
                    item.patientDetails?.email ||
                    "No email";

                  return (
                    <tr
                      key={item._id}
                      className="group hover:bg-slate-50/70 transition-colors"
                    >

                      {/* Patient */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3 min-w-[220px]">

                          <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm">
                            {patientName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <p className="font-medium text-sm text-slate-800 truncate">
                              {patientName}
                            </p>

                            <p className="text-xs text-slate-400 truncate mt-0.5">
                              {patientEmail}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Age */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {item.patientDetails?.age || "—"}
                        </span>
                      </td>

                      {/* Gender */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600 capitalize">
                          {item.patientDetails?.gender || "—"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600 whitespace-nowrap">
                          {item.patientDetails?.phone || "—"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600 whitespace-nowrap">
                          {item.appointmentDate
                            ? new Date(
                                item.appointmentDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </td>

                      {/* Slot */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 whitespace-nowrap">
                          {item.slot || "—"}
                        </span>
                      </td>

                      {/* Reason */}
                      <td className="px-5 py-4 max-w-[220px]">
                        <p
                          className="text-sm text-slate-600 truncate"
                          title={item.reason}
                        >
                          {item.reason || "—"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">

                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(
                              item._id,
                              e.target.value
                            )
                          }
                          className={`
                            appearance-none rounded-lg border-0
                            px-3 py-1.5 pr-8 text-xs font-semibold
                            cursor-pointer outline-none
                            focus:ring-2 focus:ring-blue-100
                            ${
                              item.status === "approved"
                                ? "bg-emerald-50 text-emerald-700"
                                : item.status === "pending"
                                ? "bg-amber-50 text-amber-700"
                                : item.status === "completed"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-red-50 text-red-700"
                            }
                          `}
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="approved">
                            Approved
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>

                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <Users className="h-5 w-5 text-slate-400" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-700">
                      No patients found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Patient appointments will appear here.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
);

}
export default ADashboard;
