"use client";

import Image from "next/image";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section className="relative bg-white md:bg-[#F2F2F4] overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-2 lg:px-0 py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* ================= LEFT CONTENT ================= */}
          <div className="max-w-[480px]">
            <p className="text-xs tracking-[0.25em] text-gray-500 uppercase mb-6">
              Contact Us
            </p>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#4B4B6A] leading-tight">
              Ready to start your design journey?
            </h2>

            <p className="mt-6 text-gray-500 text-sm sm:text-base leading-relaxed">
              Contact us today to discuss your ideas and needs. Our team is here
              to provide personalized solutions and expert advice. Let’s bring
              your vision to life with a consultation tailored just for you.
            </p>

            <div className="my-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center
                           bg-gradient-to-r from-[#6D28D9] to-[#5E1EE5]
                           text-white text-sm font-medium
                           px-6 py-2 rounded-[10px]
                           shadow-md hover:opacity-90 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* ================= RIGHT IMAGE COMPOSITION ================= */}
          <div className="hidden md:block relative w-full max-w-[410px] h-[550px]">
            {/* Purple Background Accent */}
            <div
              className="absolute top-[25%] right-[50%] w-[90%] h-[45%] 
                            rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <Image
                src="/images/contactImage2.png"
                alt="Design workspace"
                fill
                className="object-cover"
              />
            </div>

            {/* Main Image Card */}
            <div
              className="absolute top-0 left-0 w-[90%] h-full 
                             overflow-hidden shadow-2xl z-1"
            >
              <Image
                src="/images/contactImage1.png"
                alt="Design workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
