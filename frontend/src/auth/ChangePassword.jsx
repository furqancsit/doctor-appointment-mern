import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldpassword: "",
    newpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldpassword || !form.newpassword) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        "/api/v1/auth/change-password",
        form
      );

      toast.success("Password updated successfully");

      if (res.data?.user) {
        setUser(res.data.user);
      }

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Change Password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Secure your account by updating your password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Old Password */}
          <div>
            <label className="text-sm text-gray-600">Old Password</label>
            <input
              type="password"
              name="oldpassword"
              value={form.oldpassword}
              onChange={handleChange}
              placeholder="Enter old password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type={show ? "text" : "password"}
              name="newpassword"
              value={form.newpassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Show Password Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setShow(!show)}
            />
            <span className="text-sm text-gray-600">
              Show password
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;