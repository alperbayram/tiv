"use client";

import React from "react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="bg-white shadow-lg rounded-lg p-8 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center gap-10">
        {/* Left side: Text Content */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-[#9333ea] text-lg font-semibold mb-2">
            How It Started
          </h2>
          <h1 className="text-gray-900 text-4xl sm:text-5xl font-bold leading-tight mb-6">
           Meet the Innovators Behind TIV: Revolutionizing Travel Identity Verification
          </h1>
          <p className="text-gray-600 text-lg"> 
          We are a diverse team of seven passionate individuals from various backgrounds,
          united by a common goal: to revolutionize the way we manage and verify our identities in the digital world.
          Over the course of a three-day hackathon, we've come together to create TIV—a platform that ensures privacy, security,
          and seamless access to your travel-related information using blockchain technology. Our different expertise,
          ranging from technology to design, drives our mission to make identity verification faster, easier, and more secure
          for everyone.
          </p>
        </div>

        {/* Right side: Statistics */}
        <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">48</h3>
            <p className="text-gray-600">Hours Experience</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">1</h3>
            <p className="text-gray-600">Project Challenge</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">10</h3>
            <p className="text-gray-600">Positive Reviews</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">7</h3>
            <p className="text-gray-600">Trusted Learners</p>
          </div>
        </div>
      </div>
    </div>
  );
}
