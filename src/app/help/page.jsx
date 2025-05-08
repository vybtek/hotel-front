"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  Calendar,
  Users,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HelpPage() {
  // Add this state to handle client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [openSection, setOpenSection] = useState("booking");
  const [searchQuery, setSearchQuery] = useState("");

  // Use useEffect to update the isClient state when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const faqSections = {
    booking: [
      {
        question: "How do I make a reservation?",
        answer:
          "To make a reservation, search for your destination, select your check-in and check-out dates, specify the number of guests, and click 'Search'. Browse available properties, select your preferred accommodation, and follow the booking process to confirm with payment.",
      },
      {
        question: "Can I book a hotel for someone else?",
        answer:
          "Yes! You can book on behalf of someone else. During the booking process, you'll have the option to enter the guest's information. Just make sure to include their name and contact details for check-in purposes.",
      },
      {
        question: "How far in advance can I make a reservation?",
        answer:
          "Most properties allow bookings up to 12 months in advance. Some exclusive properties might have different policies, which will be clearly indicated on their listing page.",
      },
    ],
    payment: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. Some properties may also offer pay-at-property options.",
      },
      {
        question: "When will I be charged for my booking?",
        answer:
          "This depends on the property's policy. Some require immediate payment, while others only require a deposit or allow payment upon arrival. The payment terms are clearly displayed during the booking process.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No, we believe in transparent pricing. All mandatory fees are displayed before you confirm your booking. Optional extras may be available at an additional cost, but these are clearly marked.",
      },
    ],
    cancellation: [
      {
        question: "How do I cancel or modify my reservation?",
        answer:
          "Log into your account, go to 'My Bookings', select the reservation you wish to change, and click on 'Cancel' or 'Modify'. Cancellation policies vary by property and rate type, so please review the specific terms before making changes.",
      },
      {
        question: "What is the cancellation policy?",
        answer:
          "Cancellation policies vary by property. These can range from free cancellation up to 24 hours before check-in to non-refundable bookings. The specific policy for your booking is displayed during the booking process and in your confirmation email.",
      },
      {
        question: "Will I get a refund if I need to cancel?",
        answer:
          "Refunds depend on the property's cancellation policy and how far in advance you cancel. If you cancel within the free cancellation period, you'll receive a full refund. Outside this period, partial or no refunds may apply.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the 'Sign Up' button in the top right corner of the homepage. Enter your email address, create a password, and fill in your personal details. Verify your email address through the link we send you, and your account will be active.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click on 'Login', then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      },
      {
        question: "How do I update my account information?",
        answer:
          "Log into your account, go to 'My Profile', and click 'Edit' next to the information you want to update. Make your changes and click 'Save' to update your profile.",
      },
    ],
    rewards: [
      {
        question: "How does the rewards program work?",
        answer:
          "Our rewards program lets you earn points for every booking. For every $1 spent, you earn 10 points. These points can be redeemed for discounts on future bookings, room upgrades, or exclusive experiences.",
      },
      {
        question: "How do I join the rewards program?",
        answer:
          "All registered users are automatically enrolled in our rewards program. Simply create an account and start booking to earn points. You can track your points balance in the 'My Rewards' section of your account.",
      },
      {
        question: "When do my reward points expire?",
        answer:
          "Reward points are valid for 24 months from the date of your last activity. 'Activity' includes making a booking, staying at a property, or redeeming points. Keep your account active to maintain your points balance.",
      },
    ],
  };

  const filterFaqs = () => {
    if (!searchQuery) return faqSections;

    const filteredSections = {};

    Object.keys(faqSections).forEach((sectionKey) => {
      const filteredQuestions = faqSections[sectionKey].filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredQuestions.length > 0) {
        filteredSections[sectionKey] = filteredQuestions;
      }
    });

    return filteredSections;
  };

  const filteredFaqs = filterFaqs();
  const hasFaqResults = Object.keys(filteredFaqs).length > 0;

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const featuredGuides = [
    {
      title: "Complete Booking Guide",
      description:
        "Step-by-step instructions for finding and booking your perfect stay",
      icon: <Calendar className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Payment & Security",
      description:
        "Learn about our secure payment methods and protection policies",
      icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Traveling with Family",
      description: "Tips for booking accommodations for family trips",
      icon: <Users className="h-8 w-8 text-indigo-500" />,
    },
  ];

  // Function to handle opening WhatsApp
  const handleStartChat = () => {
    window.open("https://wa.me/919001992597", "_blank");
  };

  // Function to handle opening email client
  const handleEmailUs = () => {
    window.location.href =
      "mailto:plan.regalweddings@gmail.com?subject=Support Request";
  };

  // Only render the component content on the client side
  if (!isClient) {
    return null; // Return null on the server or during initial client render
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-3">
            {/* Logo with hover animation */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={48}
                className="h-auto w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Navigation with micro-interactions */}
            <div className="flex items-center gap-6">
              <button
                suppressHydrationWarning
                className="relative px-1 py-2 text-gray-600 hover:text-indigo-600 transition-colors group"
              >
                <a
                  href="/help"
                  className="flex items-center gap-1 text-blue-600 "
                >
                  {/* <FiHelpCircle className="text-lg" /> */}
                  <span>Help</span>
                </a>
                <span className="absolute bottom-0 left-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 mt-14">
        {/* Featured Help Guides */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Featured Help Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-indigo-100"
              >
                <div className="mb-4">{guide.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {guide.title}
                </h3>
                <p className="text-gray-600">{guide.description}</p>
                {/* <div className="mt-4 flex items-center text-indigo-600 font-medium">
                  Read guide <ChevronDown className="h-4 w-4 ml-1" />
                </div> */}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>

          {!hasFaqResults && searchQuery && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any FAQs matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Clear search
              </button>
            </div>
          )}

          {hasFaqResults &&
            Object.keys(filteredFaqs).map((section) => (
              <div key={section} className="mb-6">
                <button
                  onClick={() => handleSectionClick(section)}
                  className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex justify-between items-center"
                >
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {section} Questions
                  </h3>
                  {openSection === section ? (
                    <ChevronUp className="h-5 w-5 text-indigo-600 cursor-pointer" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-indigo-600 cursor-pointer" />
                  )}
                </button>

                {openSection === section && (
                  <div className="mt-2 space-y-2">
                    {filteredFaqs[section].map((faq, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500"
                      >
                        <h4 className="text-lg font-medium mb-3 text-gray-800">
                          {faq.question}
                        </h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
              <div className="mb-4 flex items-center">
                <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Chat With Us
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get immediate assistance from our customer support team through
                WhatsApp.
              </p>
              <button
                onClick={handleStartChat}
                className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <div className="mb-4 flex items-center">
                <Mail className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Email Support
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <button
                onClick={handleEmailUs}
                className="cursor-pointer px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
              >
                Email Us
              </button>
            </div>
          </div>
        </section>

        {/* Support Information */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Support Information
          </h2>
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Phone className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">Call Us</h4>
                    <a
                      href="tel:+919001992597"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      +91 9001992597
                    </a>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <a
                      href="mailto:plan.regalweddings@gmail.com"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      plan.regalweddings@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">Office</h4>
                    <p className="text-gray-600">
                      01 Kala Rohi Rani Rd Udaipur Rajasthan
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">Time Table</h4>
                    <p className="text-gray-600">
                      Check In Time : 2:00 PM
                      <br />
                      Check Out Time : 12:00 PM
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <Star className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Premium Support
                    </h4>
                    <p className="text-gray-600">
                      Rewards members receive priority support
                      <br />
                      <span className="text-indigo-600 font-medium">
                        Join our rewards program
                      </span>
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Customer Satisfaction</h2>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-4">96% of customers resolve their issues with our help center</h3>
                <p className="text-indigo-100">Join thousands of satisfied travelers who found the answers they needed quickly and easily.</p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-sm max-w-md">
                <p className="italic mb-4">"The help center was incredibly useful when I needed to modify my booking at the last minute. I found exactly what I needed in seconds!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-xs text-indigo-200">Verified Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}
