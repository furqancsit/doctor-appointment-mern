import { useState, useRef } from "react";
import axios from "axios";

const defaultAvailability = [
  { day: "Monday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Tuesday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Wednesday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Thursday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Friday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Saturday", slots: ["09:00 AM", "10:00 AM"] },
];

const CreateDoctor = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const submitLock = useRef(false);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    hospitalName: "",
    address: "",
    fee: "",
    rating: "",
    availability: defaultAvailability,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = form.availability.map((entry, entryIndex) => {
      if (entryIndex !== index) return entry;

      if (field === "day") {
        return { ...entry, day: value };
      }

      if (field === "slots") {
        return { ...entry, slots: value };
      }

      return entry;
    });

    setForm({ ...form, availability: updatedAvailability });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current || loading) return;

    submitLock.current = true;

    try {
      setLoading(true);
      setSuccess(false);

      const payload = {
        ...form,
        availability: form.availability?.length ? form.availability : defaultAvailability,
      };

      await axios.post("/api/v1/doctor/create", payload, {
        withCredentials: true,
      });

      setSuccess(true);
    } catch (err) {
    } finally {
      submitLock.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}


      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto mt-16">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Doctor
          </h1>
          <p className="text-gray-500">
            Create doctor profile for appointment system
          </p>
        </div>

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-xl">
            Doctor created successfully 🎉
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">

          {/* LEFT - BASIC INFO */}
          <div className="lg:col-span-2 space-y-6">

            {/* CARD 1 */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Doctor Name" />
                <input className="input" name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" />
                <input className="input" name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" />
                <input className="input" name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (Years)" />
                <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Hospital Details
              </h2>

              <div className="space-y-4">
                <input className="input" name="hospitalName" value={form.hospitalName} onChange={handleChange} placeholder="Hospital Name" />
                <textarea className="input h-24" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Pricing
              </h2>

              <input className="input" name="fee" value={form.fee} onChange={handleChange} placeholder="Consultation Fee" />
            </div>

            {/* CARD 4 */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Availability Slots
              </h2>

              <div className="space-y-3">
                {form.availability.map((entry, index) => (
                  <div key={`${entry.day}-${index}`} className="grid md:grid-cols-[140px_1fr] gap-3">
                    <input
                      className="input"
                      value={entry.day}
                      onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
                      placeholder="Day"
                    />
                    <input
                      className="input"
                      value={entry.slots.join(", ")}
                      onChange={(e) => handleAvailabilityChange(index, "slots", e.target.value.split(",").map((slot) => slot.trim()).filter(Boolean))}
                      placeholder="09:00 AM, 10:00 AM"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - ACTION PANEL */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow p-6 sticky top-6">

              <h2 className="font-semibold text-lg mb-4">
                Publish Doctor Profile
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                Once created, patients can book appointments.
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white ${loading ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
              >
                {loading ? "Saving..." : "Save & Publish"}
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Secure system • Real-time booking enabled
              </p>
            </div>

            {/* STATUS CARD */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold mb-2">System Status</h3>
              <p className="text-green-600 text-sm">● API Connected</p>
              <p className="text-green-600 text-sm">● Database Active</p>
            </div>

          </div>
        </form>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            outline: none;
            transition: 0.2s;
          }

          .input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default CreateDoctor;