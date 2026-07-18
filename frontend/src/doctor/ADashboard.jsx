import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CalendarDays,
  Users,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Stethoscope,
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
    <div className="min-h-screen mt-24 max-w-7xl mx-auto bg-gray-100 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Doctor Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data?.totalAppointments}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Total Patients</h3>
          <p className="text-3xl font-bold text-green-600">
            {data?.totalPatients}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Today's Appointments</h3>
          <p className="text-3xl font-bold text-purple-600">
            {data?.todayAppointments}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Upcoming</h3>
          <p className="text-3xl font-bold text-orange-600">
            {data?.upcomingAppointments}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-red-500">
            {data?.statusCount?.pending}
          </p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-yellow-100 rounded-lg p-4">
          <h4 className="font-semibold">Pending</h4>
          <p className="text-2xl">{data?.statusCount?.pending}</p>
        </div>

        <div className="bg-green-100 rounded-lg p-4">
          <h4 className="font-semibold">Approved</h4>
          <p className="text-2xl">{data?.statusCount?.approved}</p>
        </div>

        <div className="bg-red-100 rounded-lg p-4">
          <h4 className="font-semibold">Cancelled</h4>
          <p className="text-2xl">{data?.statusCount?.cancelled}</p>
        </div>

        <div className="bg-blue-100 rounded-lg p-4">
          <h4 className="font-semibold">Completed</h4>
          <p className="text-2xl">{data?.statusCount?.completed}</p>
        </div>
      </div>

      {/* Patients Table */}
     <div className="rounded-3xl bg-white shadow-xl overflow-hidden border border-slate-200">

        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Patients
            </h2>
            <p className="text-slate-500 text-sm">
              Latest appointment records
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">
              <tr className="text-left text-slate-600 text-sm">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Appointment</th>
                <th className="px-6 py-4">Slot</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>

              {patients?.length > 0 ? (
                patients.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                          {(item.patientDetails?.name ||
                            item.patient?.name)?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {item.patientDetails?.name || item.patient?.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {item.patient?.email ||
                              item.patientDetails?.email}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">
                      {item.patientDetails?.age}
                    </td>

                    <td className="px-6 py-5">
                      {item.patientDetails?.gender}
                    </td>

                    <td className="px-6 py-5">
                      {item.patientDetails?.phone}
                    </td>

                    <td className="px-6 py-5">
                      {new Date(
                        item.appointmentDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      {item.slot}
                    </td>

                    <td className="px-6 py-5">
                      {item.reason}
                    </td>

                    <td className="px-6 py-5">

                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(item._id, e.target.value)
                        }
                        className={`rounded-xl px-4 py-2 border-0 font-semibold shadow-sm
                        ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-16 text-center text-slate-500"
                  >
                    No Patients Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
);
}
export default ADashboard;
