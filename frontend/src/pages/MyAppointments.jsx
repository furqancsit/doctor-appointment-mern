import axios from "axios";
import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock3,
    UserRound,
    CheckCircle2,
    XCircle,
    ClipboardCheck,
} from "lucide-react";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(
                    "/api/v1/appointment/my",
                    { withCredentials: true }
                );

                setAppointments(res.data.appointments);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAppointments();
    }, []);


    return (
  <div className="min-h-screen bg-slate-50">
  <div className="mx-auto max-w-7xl px-6 py-24">
      {/* Header */}
     <div className="mb-10">
  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
    <CalendarDays className="h-4 w-4" />
    Appointments
  </span>

  <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
    My Appointments
  </h1>

  <p className="mt-2 max-w-xl text-slate-500">
    View and manage your upcoming and previous appointments.
  </p>
</div>
      {/* Empty State */}
      {appointments.length === 0 ? (
       <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">

  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
    <CalendarDays className="h-8 w-8 text-slate-600" />
  </div>

  <h2 className="mt-6 text-xl font-semibold text-slate-900">
    No appointments found
  </h2>

  <p className="mt-2 text-slate-500">
    Book your first appointment to get started.
  </p>

  <button className="mt-8 rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">
    Book Appointment
  </button>

</div>
      ) : (

        <div className="space-y-6">

          {appointments.map((app) => {
            const status = app.status || "booked";

            const statusStyles = {
  booked: {
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  confirmed: {
    bg: "bg-green-50",
    text: "text-green-700",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
  },
  completed: {
    bg: "bg-slate-100",
    text: "text-slate-700",
  },
};

            const style = statusStyles[status] || statusStyles.booked;

            return (
              <div
  key={app._id}
  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm"
>

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    {/* Doctor */}

    <div className="flex items-center gap-4">

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
        <UserRound className="h-6 w-6 text-slate-700" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Dr. {app.doctor.name}
        </h3>

        <p className="text-sm text-slate-500">
          General Consultation
        </p>
      </div>

    </div>

    {/* Date */}

    <div className="flex gap-8">

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Date
        </p>

        <p className="mt-1 font-medium text-slate-900">
          {app.appointmentDate}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Time
        </p>

        <p className="mt-1 font-medium text-slate-900">
          {app.slot}
        </p>
      </div>

    </div>

    {/* Status */}

    <div className="flex items-center gap-4">

      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${style.bg} ${style.text}`}
      >
        {status}
      </span>

      <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
        Details
      </button>

    </div>

  </div>

</div>
            );
          })}

        </div>

      )}

    </div>
  </div>
);
};

export default MyAppointments;