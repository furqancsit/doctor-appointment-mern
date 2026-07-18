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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Info */}
            <div className="bg-white/80 backdrop-blur border border-gray-100 shadow-xl rounded-3xl p-8">
              <h1 className="text-4xl font-bold text-gray-900">
                Dr. {doctor.name}
              </h1>

              <p className="text-blue-600 font-semibold mt-2 text-lg">
                {doctor.specialization}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-gray-50 border">
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="text-xl font-semibold">
                    {doctor.experience} Years
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border">
                  <p className="text-gray-500 text-sm">Fee</p>
                  <p className="text-xl font-semibold">₹{doctor.fee}</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold">About Doctor</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {doctor.bio ||
                    "Experienced healthcare professional dedicated to providing quality care."}
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white/80 backdrop-blur border shadow-xl rounded-3xl p-8">
              <h4 className="text-lg font-semibold mb-5">Select Date</h4>

              <div className="border rounded-2xl overflow-hidden">
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

                    return !doctor.availability?.some((d) => d.day === dayName);
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Slots */}
            {selectedDate && (
              <div className="bg-white/80 backdrop-blur border shadow-xl rounded-3xl p-8">
                <h4 className="text-lg font-semibold mb-5">Available Slots</h4>

                {loadingSlots ? (
                  <p className="text-gray-500">Checking availability...</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-5 py-2.5 rounded-xl border transition
                            ${
                              selectedSlot === slot
                                ? "bg-blue-600 text-white border-blue-600"
                                : "hover:border-blue-500"
                            }`}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No slots available for this date
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <div className="sticky top-28 bg-white/80 backdrop-blur border shadow-2xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold">Book Appointment</h3>

              <p className="mt-6 text-gray-500 text-sm">Consultation Fee</p>

              <p className="text-4xl font-bold mt-1">₹{doctor.fee}</p>

              <button
                onClick={() => setShowPatientForm(true)}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showPatientForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-100 w-full max-w-lg rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Patient Details</h2>

              <div className="space-y-4">
                <input
                  placeholder="Name"
                  className="w-full border p-3 rounded-xl"
                  value={patientDetails.name}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Age"
                  type="number"
                  className="w-full border p-3 rounded-xl"
                  value={patientDetails.age}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      age: e.target.value,
                    })
                  }
                />

                <select
                  className="w-full border p-3 rounded-xl"
                  value={patientDetails.gender}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <input
                  placeholder="Phone"
                  className="w-full border p-3 rounded-xl"
                  value={patientDetails.phone}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      phone: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Email"
                  className="w-full border p-3 rounded-xl"
                  value={patientDetails.email}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      email: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Reason"
                  className="w-full border p-3 rounded-xl"
                  value={patientDetails.reason}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      reason: e.target.value,
                    })
                  }
                />

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowPatientForm(false)}
                    className="flex-1 border py-3 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleBooking}
                    disabled={submitting}
                    className={`flex-1 py-3 rounded-xl cursor-pointer ${submitting ? "bg-gray-400" : "bg-blue-600 text-white"}`}
                  >
                    {submitting ? "Booking..." : "Confirm"}
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
