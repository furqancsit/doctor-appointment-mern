const DoctorModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Doctor Info */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
            Dr
          </div>

          <h2 className="text-xl font-semibold mt-3">
            Dr. {doctor?.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {doctor?.specialization || "General Physician"}
          </p>
        </div>

        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Email:</span>
            <span>{doctor?.email || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span>Phone:</span>
            <span>{doctor?.phone || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span>Experience:</span>
            <span>{doctor?.experience || "N/A"} yrs</span>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DoctorModal