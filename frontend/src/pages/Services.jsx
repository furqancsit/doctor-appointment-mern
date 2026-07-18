import {
  CalendarDays,
  UserRound,
  Stethoscope,
  Clock3,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";
import CTASection from "../components/CTASection";

const services = [
  {
    title: "Online Appointment Booking",
    description:
      "Book appointments with your preferred doctors in just a few clicks.",
    icon: CalendarDays,
  },
  {
    title: "Experienced Doctors",
    description:
      "Consult with qualified and experienced specialists across multiple departments.",
    icon: Stethoscope,
  },
  {
    title: "Patient Management",
    description:
      "Maintain patient details and appointment history securely in one place.",
    icon: UserRound,
  },
  {
    title: "24/7 Availability",
    description:
      "Schedule appointments anytime, anywhere with our online platform.",
    icon: Clock3,
  },
  {
    title: "Secure Medical Records",
    description:
      "Your medical information is stored safely with complete privacy and security.",
    icon: ShieldCheck,
  },
  {
    title: "Quality Healthcare",
    description:
      "Providing reliable healthcare services with patient satisfaction as our priority.",
    icon: HeartPulse,
  },
];

const Services = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r mt-24 from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Healthcare Services</h1>

          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            We make healthcare simple, accessible, and secure. From booking
            appointments to managing patient records, our platform provides
            everything you need.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">
                  <Icon
                    size={32}
                    className="text-blue-600 group-hover:text-white"
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>

                <p className="text-gray-600 leading-7">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine technology with healthcare to deliver a smooth,
              reliable, and patient-friendly experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600">100+</h3>
              <p className="mt-3 text-gray-600">Verified Doctors</p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600">10K+</h3>
              <p className="mt-3 text-gray-600">Appointments Booked</p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600">99%</h3>
              <p className="mt-3 text-gray-600">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
};

export default Services;
