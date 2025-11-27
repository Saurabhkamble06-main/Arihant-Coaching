import React from "react";
import { motion } from "framer-motion";

export default function BlogSection() {
  const blogs = [
    {
      title: "Tips to Score 90%+ in SSC Exams",
      desc: "Learn how to plan your study schedule and manage time effectively for SSC exams.",
      date: "Nov 10, 2025",
      author: "Arihant Coaching Experts",
      image: "https://trainingindustry.com/content/uploads/2018/12/Measuring-Coaching-with-Leading-Indicators-12.11.18.jpg",
    },
    {
      title: "Choosing the Right Stream After 10th",
      desc: "Science, Commerce, or Arts — find out which path suits your interests and goals.",
      date: "Nov 5, 2025",
      author: "Career Guidance Team",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVzzHZpL8qdwmPNKJlTF6EcFLXae7yXDUcA&s",
    },
    {
      title: "How Arihant Coaching Helps You Succeed",
      desc: "Discover our unique teaching approach and why thousands of students trust us every year.",
      date: "Nov 2, 2025",
      author: "Arihant Faculty",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDlsn0yksPNHLROxl9iXf8quTHKjZURgE2w&s",
    },
  ];

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-white to-blue-50 text-center px-6">
      <h2 className="text-4xl font-bold text-slate-800 mb-3">Our Blog</h2>
      <p className="text-slate-500 mb-10 text-lg">
        Insights, tips, and guidance to help you excel in academics and beyond.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-6 text-left">
              <p className="text-sm text-gray-500 mb-2">
                {blog.date} • {blog.author}
              </p>
              <h3 className="text-xl font-semibold text-blue-700 mb-3 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-base line-clamp-3">{blog.desc}</p>
              <button className="mt-4 inline-flex items-center text-blue-700 font-semibold hover:text-blue-900 transition-colors">
                Read More <span className="ml-1">→</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
