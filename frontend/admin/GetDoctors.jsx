import React, { useState, useEffect } from "react";
import axios from "axios";

const GetDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleGet = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/v1/doctor/");
            setDoctors(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch doctors");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGet();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40 text-gray-600">
                Loading doctors...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-4">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                All Doctors
            </h2>

            {doctors.length === 0 ? (
                <p className="text-gray-500">No doctors found</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">
                                Dr. {doctor.name}
                            </h3>

                            <p className="text-gray-600 mt-1">
                                <span className="font-medium">Specialization:</span>{" "}
                                {doctor.specialization}
                            </p>

                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {doctor.email}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {doctor.fee}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetDoctors;