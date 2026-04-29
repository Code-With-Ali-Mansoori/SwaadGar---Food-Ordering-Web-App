import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Replace with your actual EmailJS credentials
    const SERVICE_ID = "service_ngu5q2a"; // Your Service ID
    const TEMPLATE_ID = "template_pf73w8r"; // Your Template ID
    const PUBLIC_KEY = "d3_R4LJwn5bakDEyH"; // Your Public Key (API Key)

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
          e.target.reset(); // clear form
      }, (error) => {
          console.log(error.text);
          toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <div className='contact-us' id='contact-us'>
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail} className='contact-form'>
        <div className="contact-inputs">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
