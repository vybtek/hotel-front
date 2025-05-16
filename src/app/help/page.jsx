"use client";

import { useState, useEffect, useCallback, memo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  Users,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const faqSections = {
  booking: [
    { question: "How do I make a reservation?", answer: "To make a reservation, search for your destination, select your check-in and check-out dates, specify the number of guests, and click 'Search'. Browse available properties, select your preferred accommodation, and follow the booking process to confirm with payment." },
    { question: "Can I book a hotel for someone else?", answer: "Yes! You can book on behalf of someone else. During the booking process, you'll have the option to enter the guest's information. Just make sure to include their name and contact details for check-in purposes." },
    { question: "How far in advance can I make a reservation?", answer: "Most properties allow bookings up to 12 months in advance. Some exclusive properties might have different policies, which will be clearly indicated on their listing page." },
  ],
  payment: [
    { question: "What payment methods are accepted?", answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. Some properties may also offer pay-at-property options." },
    { question: "When will I be charged for my booking?", answer: "This depends on the property's policy. Some require immediate payment, while others only require a deposit or allow payment upon arrival. The payment terms are clearly displayed during the booking process." },
    { question: "Are there any hidden fees?", answer: "No, we believe in transparent pricing. All mandatory fees are displayed before you confirm your booking. Optional extras may be available at an additional cost, but these are clearly marked." },
  ],
  cancellation: [
    { question: "How do I cancel or modify my reservation?", answer: "Log into your account, go to 'My Bookings', select the reservation you wish to change, and click on 'Cancel' or 'Modify'. Cancellation policies vary by property and rate type, so please review the specific terms before making changes." },
    { question: "What is the cancellation policy?", answer: "Cancellation policies vary by property. These can range from free cancellation up to 24 hours before check-in to non-refundable bookings. The specific policy for your booking is displayed during the booking process and in your confirmation email." },
    { question: "Will I get a refund if I need to cancel?", answer: "Refunds depend on the property's cancellation policy and how far in advance you cancel. If you cancel within the free cancellation period, you'll receive a full refund. Outside this period, partial or no refunds may apply." },
  ],
  account: [
    { question: "How do I create an account?", answer: "Click on the 'Sign Up' button in the top right corner of the homepage. Enter your email address, create a password, and fill in your personal details. Verify your email address through the link we send you, and your account will be active." },
    { question: "I forgot my password. What should I do?", answer: "Click on 'Login', then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password." },
    { question: "How do I update my account information?", answer: "Log into your account, go to 'My Profile', and click 'Edit' next to the information you want to update. Make your changes and click 'Save' to update your profile." },
  ],
  rewards: [
    { question: "How does the rewards program work?", answer: "Our rewards program lets you earn points for every booking. For every $1 spent, you earn 10 points. These points can be redeemed for discounts on future bookings, room upgrades, or exclusive experiences." },
    { question: "How do I join the rewards program?", answer: "All registered users are automatically enrolled in our rewards program. Simply create an account and start booking to earn points. You can track your points balance in the 'My Rewards' section of your account." },
    { question: "When do my reward points expire?", answer: "Reward points are valid for 24 months from the date of your last activity. 'Activity' includes making a booking, staying at a property, or redeeming points. Keep your account active to maintain your points balance." },
  ],
};

const featuredGuides = [
  {
    title: "Complete Booking Guide",
    description: "Step-by-step instructions for finding and booking your perfect stay",
    icon: <Calendar className="h-8 w-8 text-indigo-500" />,
  },
  {
    title: "Payment & Security",
    description: "Learn about our secure payment methods and protection policies",
    icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
  },
  {
    title: "Traveling with Family",
    description: "Tips for booking accommodations for family trips",
    icon: <Users className="h-8 w-8 text-indigo-500" />,
  },
];

const ContactButton = memo(({ onClick, label, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    aria-label={label}
  >
    {icon}
    {label}
  </button>
));

const FAQSection = memo(({ section, faqs, isOpen, toggleSection }) => (
  <div className="mb-6">
    <button
      onClick={() => toggleSection(section)}
      className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex justify-between items-center"
      aria-expanded={isOpen}
      aria-controls={`faq-${section}`}
    >
      <h3 className="text-xl font-semibold text-gray-800 capitalize">{section} Questions</h3>
      {isOpen ? <ChevronUp className="h-5 w-5 text-indigo-600" /> : <ChevronDown className="h-5 w-5 text-indigo-600" />}
    </button>
    {isOpen && (
      <div id={`faq-${section}`} className="mt-2 space-y-2">
        {faqs.map((faq, index) => (
          <article key={`${section}-${index}`} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
            <h4 className="text-lg font-medium mb-3 text-gray-800">{faq.question}</h4>
            <p className="text-gray-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    )}
  </div>
));

const HelpPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [openSection, setOpenSection] = useState("booking");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSection = useCallback((section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="fixed top-0 w-full z-50 bg-white border-b shadow-sm hover:shadow-md transition-shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="group">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={140}
              height={48}
              className="transition-transform group-hover:scale-105"
              priority
            />
          </Link>
          <Link href="/help" className="relative px-1 py-2 text-blue-600 hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:w-0 hover:after:w-full after:transition-all">
            Help
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 mt-14">
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Featured Help Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map(({ title, description, icon }, index) => (
              <article key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-indigo-100">
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
          {Object.entries(faqSections).map(([section, faqs]) => (
            <FAQSection
              key={section}
              section={section}
              faqs={faqs}
              isOpen={openSection === section}
              toggleSection={toggleSection}
            />
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
              <div className="mb-4 flex items-center">
                <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Chat With Us</h3>
              </div>
              <p className="text-gray-600 mb-4">Get immediate assistance via WhatsApp.</p>
              <ContactButton
                onClick={() => window.open("https://wa.me/919001992597", "_blank")}
                icon={<MessageSquare className="h-5 w-5 mr-2" />}
                label="Start Chat"
              />
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <div className="mb-4 flex items-center">
                <Mail className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Email Support</h3>
              </div>
              <p className="text-gray-600 mb-4">We'll respond within 24 hours.</p>
              <ContactButton
                onClick={() => window.location.href = "mailto:plan.regalweddings@gmail.com?subject=Support Request"}
                icon={<Mail className="h-5 w-5 mr-2" />}
                label="Email Us"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Support Information</h2>
          <div className="bg-white rounded-xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Call Us</h4>
                  <a href="tel:+919001992597" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    +91 9001992597
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <a href="mailto:plan.regalweddings@gmail.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    plan.regalweddings@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Office</h4>
                  <p className="text-gray-600">01 Kala Rohi Rani Rd, Udaipur, Rajasthan</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-indigo-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Time Table</h4>
                <p className="text-gray-600">
                  Check In: 2:00 PM<br />
                  Check Out: 12:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default memo(HelpPage);