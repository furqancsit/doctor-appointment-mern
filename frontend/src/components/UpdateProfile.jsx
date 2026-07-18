import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const { user, setUser, checkAuth } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.put(
                "/api/v1/auth/profile",
                formData,
                {
                    withCredentials: true,
                }

            );

            await checkAuth()

            // Update context immediately
            setUser(data.user);

            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Update Profile
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Keep your account information up to date.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={changeHandler}
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            placeholder="john@example.com"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold transition duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;