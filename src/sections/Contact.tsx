import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInUp, createAnimationProps } from "../utils/animations";

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", // replace with your script URL
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }, [formData]);

  return (
    <section id="contact" ref={ref} className="section bg-navy-900">
      <motion.div
        {...createAnimationProps(fadeInUp, inView)}
        className="section-content"
      >
        <div className="flex items-center mb-12">
          <span className="section-number">05.</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-slate-200 text-center mb-12">
            I'm currently looking for new opportunities. Whether you have a question
            or just want to say hi, feel free to reach out!
          </p>

          <form onSubmit={handleSubmit} className="card space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-navy-900 border border-slate-400/20 rounded px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-400 transition-colors"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-navy-900 border border-slate-400/20 rounded px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-400 transition-colors"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-navy-900 border border-slate-400/20 rounded px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-400 transition-colors resize-none"
              required
            ></textarea>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-primary-400 mt-2 text-center font-mono">
                Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-accent-red mt-2 text-center font-mono">
                Error sending message. Please try again.
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
