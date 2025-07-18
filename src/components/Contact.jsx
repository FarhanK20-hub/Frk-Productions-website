import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import StarBackground from "./StarBackground";
import Button from "./Button";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zby34nn",     // EmailJS Service ID
        "template_wdsokon",    // EmailJS Template ID
        formRef.current,
        "4SvtENaGSg73pHo4q"    // EmailJS Public Key
      )
      .then(
        () => {
          setSuccessMsg("Message sent successfully!");
          formRef.current.reset();
        },
        () => {
          setSuccessMsg("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div id="contact" className="min-h-96 w-screen px-10 my-6">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 overflow-hidden">
        <StarBackground />

        {/* Contact Text & Button */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">Contact Me</p>

          <AnimatedTitle
            title="let&#39;s build <br /> the new era of content"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          />
        </div>

        {/* Contact Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              ref={formRef}
              onSubmit={sendEmail}
              key="contact-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 mt-10 mx-auto max-w-xl flex flex-col gap-4 px-4"
            >
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
                className="rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
                className="rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="text"
                name="user_mobile"
                placeholder="Mobile Number"
                required
                className="rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="text"
                name="user_subject"
                placeholder="Subject"
                required
                className="rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                required
                className="rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>

              <button
                type="submit"
                className="rounded bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700 transition"
              >
                Send
              </button>

              {successMsg && (
                <motion.p
                  className="text-sm mt-2 text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {successMsg}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contact;
