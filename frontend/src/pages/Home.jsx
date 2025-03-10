import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgVideo from "../assets/bgVideo.mp4";
import {
  AiOutlineMessage,
  AiOutlineEnvironment,
  AiOutlineDollarCircle,
} from "react-icons/ai";

const Home = () => {
  return (
    <>
      <Header />
      <div className="overflow-hidden">
        {/* Landing Section */}
        <div className="relative h-screen w-full">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={bgVideo}
            autoPlay
            loop
            muted
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <h1 className="text-white text-6xl font-bold mb-4 text-center drop-shadow-lg">
              ExploreEase
            </h1>
            <p className="text-white text-lg mb-8 text-center px-4 drop-shadow-lg">
              Plan your perfect trip with ease. Add your group size, budget, and
              preferences to create unforgettable experiences.
            </p>
            <a
              href="/planTrip"
              className="px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-400 transition duration-300"
            >
              Plan Your Trip
            </a>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <h2 className="text-4xl font-bold text-center mb-8">Our Features</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 ">
            {/* Feature 1: Real-Time Chat */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineMessage className="text-6xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Chat</h3>
              <p className="text-gray-600 text-center">
                Stay connected with your travel group, coordinate plans, and
                share updates instantly.
              </p>
            </div>

            {/* Feature 2: Recommended Places */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineEnvironment className="text-6xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recommended Places</h3>
              <p className="text-gray-600 text-center">
                Get personalized recommendations for the best attractions and
                activities based on your preferences.
              </p>
            </div>

            {/* Feature 3: Budget-Friendly Planning */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineDollarCircle className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Budget-Friendly Planning
              </h3>
              <p className="text-gray-600 text-center">
                Plan trips that suit your budget without compromising on fun or
                quality experiences.
              </p>
            </div>

            {/* Feature 4: Group Management */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineMessage className="text-6xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Group Management</h3>
              <p className="text-gray-600 text-center">
                Organize and manage your travel group effortlessly with our
                tools.
              </p>
            </div>

            {/* Feature 5: Custom Itineraries */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineEnvironment className="text-6xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Itineraries</h3>
              <p className="text-gray-600 text-center">
                Build detailed itineraries tailored to your group's interests
                and schedule.
              </p>
            </div>

            {/* Feature 6: Travel Deals */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineDollarCircle className="text-6xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Exclusive Travel Deals
              </h3>
              <p className="text-gray-600 text-center">
                Access exclusive discounts and deals to make your trips more
                affordable.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-blue-500">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Plan Your Next Adventure?
            </h2>
            <a
              href="/planTrip"
              className="px-8 py-4 bg-white text-blue-500 font-semibold text-lg rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Get Started Today
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
