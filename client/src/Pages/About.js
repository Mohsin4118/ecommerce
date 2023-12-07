import React from 'react'
import Layout from '../Components/LayOuts/Layout'
import furniture_pic from '../assets/furniture.webp'

const About = () => {
  return (
    <Layout title={"About Us"}>
       <div className="bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img
              src={furniture_pic}
              alt="Furniture Store"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Welcome to WoodsMate, your premier destination for high-quality furniture and home decor. At WoodsMate, we're passionate about helping you create your dream home by offering an exquisite collection of furniture that suits your style and comfort.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              Our furniture pieces are handcrafted with precision and attention to detail. Whether you're looking for modern, traditional, or custom-made furniture, we have the perfect pieces to transform your living spaces.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              We take pride in our commitment to customer satisfaction and are dedicated to making your furniture shopping experience unforgettable. Our experienced team is ready to assist you in finding the ideal furniture for your home.
            </p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default About
