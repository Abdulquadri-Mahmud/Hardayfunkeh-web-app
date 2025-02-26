import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-pink-500 py-16 text-white text-center">
        <h1 className="text-4xl font-bold">About Hardayfunkeh</h1>
        <p className="mt-2 text-lg">Discover quality fashion & accessories at unbeatable prices.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mt-2 leading-6.5">
            Welcome to Hardayfunkeh – your premier destination for elegant abayas, premium fabrics, exquisite jewelry, and stylish fashion. Whether you're looking for timeless modest wear, luxurious fabrics, or statement accessories, we have carefully curated collections to suit every occasion. With our unbeatable wholesale and retail deals, we guarantee top-notch quality, sophistication, and affordability. At Hardayfunkeh, we are committed to helping you express your unique style with elegance and confidence. Shop with us today and experience fashion at its finest!
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            Our mission is to provide affordable yet luxurious fashion that resonates with your style. 
            We believe that fashion should be accessible to everyone, which is why we offer a diverse collection 
            of trendy and traditional clothing at competitive prices.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Faizany?</h2>
          <ul className="mt-3 space-y-3">
            <li className="flex items-center">
              <span className="text-yellow-500 font-semibold mr-2">✔</span> High-quality materials and unique designs.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 font-semibold mr-2">✔</span> Affordable pricing with premium craftsmanship.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 font-semibold mr-2">✔</span> Fast and reliable delivery services.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 font-semibold mr-2">✔</span> Exceptional customer support and easy returns.
            </li>
          </ul>
        </section>

        {/* Meet Our Team */}
        {/* <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-4 shadow-lg rounded-lg bg-white text-center">
              <img src="https://via.placeholder.com/100" alt="Team Member" className="mx-auto rounded-full" />
              <h3 className="text-xl font-semibold mt-2">Faizany CEO</h3>
              <p className="text-gray-600 text-sm">Founder & CEO</p>
            </div>
            <div className="p-4 shadow-lg rounded-lg bg-white text-center">
              <img src="https://via.placeholder.com/100" alt="Team Member" className="mx-auto rounded-full" />
              <h3 className="text-xl font-semibold mt-2">John Doe</h3>
              <p className="text-gray-600 text-sm">Head of Operations</p>
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-4">
            <details className="p-4 border rounded-lg cursor-pointer">
              <summary className="font-semibold">How long does shipping take?</summary>
              <p className="text-gray-600 mt-2">Shipping usually takes between 3-7 business days, depending on your location.</p>
            </details>
            <details className="p-4 border rounded-lg cursor-pointer">
              <summary className="font-semibold">Do you offer refunds?</summary>
              <p className="text-gray-600 mt-2">Yes, we offer refunds within 14 days of purchase if the product is unused and in its original condition.</p>
            </details>
            {/* <details className="p-4 border rounded-lg cursor-pointer">
              <summary className="font-semibold">How can I track my order?</summary>
              <p className="text-gray-600 mt-2">You will receive an email with a tracking number once your order has been shipped.</p>
            </details> */}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-10">
          <h3 className="text-2xl font-bold text-gray-800">Join the Faizany Family</h3>
          <p className="text-gray-600 mt-2">Start shopping today and experience fashion like never before.</p>
          <a href="/shop" className="inline-block mt-4 px-6 py-3 bg-yellow-500 text-white rounded-md font-semibold shadow-md hover:bg-yellow-600 transition">
            Shop Now
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}
