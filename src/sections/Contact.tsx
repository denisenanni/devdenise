import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import type { FormEvent } from "react";

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error("Google Script URL not configured");
      }

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section id="contact" ref={ref} className="section bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <h2 className="section-title">Get In Touch</h2>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg text-center mb-12">
            Available for contract work and interesting projects. Feel free to reach out
            if you'd like to work together or just want to say hello.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
              <p className="text-gray-300 mb-8">
                Thanks for reaching out. I'll get back to you soon!
              </p>
              <button onClick={handleReset} className="btn-primary">
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-black border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors`}
                  placeholder="Your name"
                  disabled={status === "sending"}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-black border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors`}
                  placeholder="your.email@example.com"
                  disabled={status === "sending"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 bg-black border ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  } rounded text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none`}
                  placeholder="Your message..."
                  disabled={status === "sending"}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Error Message */}
              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded">
                  <p className="text-red-500 text-sm font-mono">
                    Failed to send message. Please try again or email me directly at{" "}
                    <a href="mailto:info@devdenise.com" className="underline">
                      info@devdenise.com
                    </a>
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                <a
                  href="https://www.linkedin.com/in/denise-nanni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label="Visit LinkedIn profile"
                >
                  LinkedIn
                </a>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
