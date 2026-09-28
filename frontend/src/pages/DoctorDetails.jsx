import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/api/v1/doctor/${id}`);
        setDoctor(res.data?.doctor || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!doctor?._id || !selectedDate) {
        setBookedSlots([]);
        return;
      }

      try {
        setLoadingSlots(true);
        const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
        const res = await axios.get(
          `/api/v1/appointment/availability/${doctor._id}/${dateKey}`,
        );
        setBookedSlots(res.data?.bookedSlots || []);
      } catch (err) {
        console.error(err);
        setBookedSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [doctor?._id, selectedDate]);

  const handleBooking = async () => {
    try {
      if (!selectedDate || !selectedSlot) {
        toast.error("Please select date and slot");
        return;
      }

      if (submitting) return;
      setSubmitting(true);

      const bookingData = {
        doctorId: doctor._id,
        appointmentDate: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
        slot: selectedSlot,

        patientDetails: {
          name: patientDetails.name,
          age: Number(patientDetails.age),
          gender: patientDetails.gender,
          phone: patientDetails.phone,
          email: patientDetails.email,
        },
        reason: patientDetails.reason,
      };

      await axios.post("/api/v1/appointment/book", bookingData);

      toast.success("Appointment booked successfully!");
      navigate("/my-appointment");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;

  if (!doctor) return <div className="pt-24 text-center">Doctor not found</div>;

  const selectedDayName = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "long" })
    : null;

  const slots =
    (doctor?.availability || []).find(
      (entry) => entry?.day?.toLowerCase() === selectedDayName?.toLowerCase(),
    )?.slots || [];
  const availableSlots = slots.filter(
    (slot) => slot && !bookedSlots.includes(slot),
  );

 return (
  <section className="min-h-screen bg-[#f8fafc] pt-24 pb-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* ================= LEFT ================= */}
        <div className="space-y-6">

          {/* Doctor Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Available for Consultation
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Dr. {doctor.name}
                </h1>

                <p className="mt-2 text-base font-medium text-blue-600">
                  {doctor.specialization}
                </p>
              </div>

              {/* Doctor initials/avatar */}
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {doctor.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Experience
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {doctor.experience} Years
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Consultation
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  ₹{doctor.fee}
                </p>
              </div>
            </div>

            {/* About */}
            <div className="mt-8 pt-7 border-t border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">
                About the doctor
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {doctor.bio ||
                  "Experienced healthcare professional dedicated to providing quality care."}
              </p>
            </div>
          </div>

          {/* ================= CALENDAR ================= */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Choose a date
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select a date to view available appointment times.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <Calendar
                onChange={(date) => {
                  const nextDate = Array.isArray(date) ? date[0] : date;
                  setSelectedDate(nextDate);
                  setSelectedSlot("");
                }}
                value={selectedDate}
                minDate={new Date()}
                tileDisabled={({ date }) => {
                  const dayName = date.toLocaleDateString("en-US", {
                    weekday: "long",
                  });

                  return !doctor.availability?.some(
                    (d) => d.day === dayName
                  );
                }}
                className="w-full"
              />
            </div>
          </div>

          {/* ================= SLOTS ================= */}
          {selectedDate && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Available times
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {loadingSlots ? (
                <div className="flex items-center gap-3 text-sm text-slate-500 py-4">
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                  Checking availability...
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`
                          py-2.5 px-4 rounded-xl text-sm font-medium
                          border transition-all duration-200
                          ${
                            selectedSlot === slot
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                          }
                        `}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full py-6 text-center">
                      <p className="text-sm text-slate-500">
                        No slots available for this date.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= RIGHT / BOOKING ================= */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Book appointment
              </h2>

              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                ✓
              </div>
            </div>

            <div className="mt-6 pb-6 border-b border-slate-100">
              <p className="text-sm text-slate-500">
                Consultation fee
              </p>

              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-slate-900">
                  ₹{doctor.fee}
                </span>
              </div>
            </div>

            {/* Selected appointment */}
            <div className="py-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date</span>
                <span className="font-medium text-slate-900">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Not selected"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Time</span>
                <span className="font-medium text-slate-900">
                  {selectedSlot || "Not selected"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowPatientForm(true)}
              disabled={!selectedDate || !selectedSlot}
              className={`
                w-full py-3.5 rounded-xl font-semibold text-sm
                transition-all duration-200
                ${
                  !selectedDate || !selectedSlot
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md cursor-pointer"
                }
              `}
            >
              {!selectedDate
                ? "Select a date"
                : !selectedSlot
                ? "Select a time"
                : "Continue to booking"}
            </button>

            <p className="text-xs text-center text-slate-400 mt-4">
              Secure appointment booking
            </p>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showPatientForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Patient details
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Enter your details to confirm the appointment.
                </p>
              </div>

              <button
                onClick={() => setShowPatientForm(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Full name
                </label>

                <input
                  placeholder="Enter patient name"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={patientDetails.name}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Age
                  </label>

                  <input
                    placeholder="Age"
                    type="number"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={patientDetails.age}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        age: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Gender
                  </label>

                  <select
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={patientDetails.gender}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Phone number
                </label>

                <input
                  placeholder="Enter phone number"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={patientDetails.phone}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email
                </label>

                <input
                  placeholder="you@example.com"
                  type="email"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={patientDetails.email}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Reason for visit
                </label>

                <textarea
                  placeholder="Briefly describe the reason for your visit..."
                  rows={3}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={patientDetails.reason}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      reason: e.target.value,
                    })
                  }
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">

                <button
                  onClick={() => setShowPatientForm(false)}
                  className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleBooking}
                  disabled={submitting}
                  className={`
                    flex-1 h-11 rounded-xl text-sm font-semibold transition
                    ${
                      submitting
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    }
                  `}
                >
                  {submitting ? "Booking..." : "Confirm appointment"}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
);

};

export default DoctorDetails;
