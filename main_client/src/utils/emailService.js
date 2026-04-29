import emailjs from '@emailjs/browser';

// Replace these with your actual IDs from EmailJS dashboard
const SERVICE_ID = "service_ngu5q2a";
const TEMPLATE_ID = "template_pf73w8r";
const PUBLIC_KEY = "d3_R4LJwn5bakDEyH";

// Initialize EmailJS with your Public Key
emailjs.init(PUBLIC_KEY);

export const sendOrderConfirmation = async (orderData) => {
  try {
    const templateParams = {
        order_id: orderData._id,
        email: orderData.address.email,      // Try to match both names
        user_email: orderData.address.email, // Common EmailJS variable name
        user_name: `${orderData.address.firstName} ${orderData.address.lastName}`,
        
        // This is for the {{#orders}} loop
        orders: orderData.items.map(item => ({
            name: item.name,
            price: item.price,
            units: item.quantity
        })),

        // This is for {{cost.total}} etc
        cost: {
            shipping: "2.00",
            tax: "0.00",
            total: String(orderData.amount)
        }
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log('SUCCESS!', response.status, response.text);
    return true;
  } catch (error) {
    console.log('FAILED...', error);
    alert("Email Error: " + (error?.text || error?.message || "Unknown error"));
    return false;
  }
};
