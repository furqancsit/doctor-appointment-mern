import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Pencil, Save, X } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    // TODO:
    // Call your update profile API here

    setEditing(false);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-50 px-4 py-24">
    <div className="mx-auto max-w-4xl">

      <div className="overflow-hidden rounded-[32px] border border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-8 py-12">

          <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl"></div>

          <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">

            <div className="flex items-center gap-6">

              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl font-bold text-sky-600 shadow-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-white bg-emerald-500"></span>
              </div>

              <div className="text-white">

                <p className="text-sm uppercase tracking-[0.3em] text-sky-100">
                  Patient Profile
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                  {editing ? form.name : user?.name}
                </h1>

                <p className="mt-2 text-sky-100">
                  {user?.email}
                </p>

              </div>

            </div>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-sky-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}

          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 p-8">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Full Name
              </label>

              {editing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              ) : (
                <p className="mt-4 text-lg font-semibold text-slate-800">
                  {user?.name}
                </p>
              )}

            </div>

            {/* Email */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Email Address
              </label>

              {editing ? (
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              ) : (
                <p className="mt-4 text-lg font-semibold text-slate-800">
                  {user?.email}
                </p>
              )}

            </div>

          </div>

          {/* Security */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 to-indigo-50 p-6 md:flex-row md:items-center">

            <div>

              <h3 className="text-xl font-bold text-slate-800">
                Password & Security
              </h3>

              <p className="mt-2 text-slate-600">
                Keep your account secure by updating your password regularly.
              </p>

            </div>

            <Link
              to="/change-password"
              className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition-all hover:-translate-y-1 hover:bg-slate-800"
            >
              Change Password
            </Link>

          </div>

          {/* Actions */}
          {editing && (
            <div className="flex justify-end gap-4">

              <button
                onClick={() => setEditing(false)}
                className="rounded-2xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <span className="flex items-center gap-2">
                  <X size={18} />
                  Cancel
                </span>
              </button>

              <button
                onClick={handleSave}
                className="rounded-2xl bg-sky-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-sky-700"
              >
                <span className="flex items-center gap-2">
                  <Save size={18} />
                  Save Changes
                </span>
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  </div>
);
};

export default Profile;