'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const indianStatesAndUts = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

const donationPageConfig = {
  donation: {
    title: 'Donation',
    route: '/donation',
    heading: 'Donation :',
    topNote: 'Note : Donation to Shri Kashi Vishwanath Temple Trust',
    submittedTitle: 'Donation Form Submitted',
  },
  hidden: {
    title: 'Hidden Donation',
    route: '/hidden-donation',
    heading: 'Hidden Donation :',
    topNote: 'Note : Hidden Donation to Shri Kashi Vishwanath Temple Trust',
    submittedTitle: 'Hidden Donation Form Submitted',
  },
  annakshetra: {
    title: 'Annakshetra Donation',
    route: '/annakshetra-donation',
    heading: 'Annakshetra Donation :',
    topNote: 'Note : Annakshetra Donation to Shri Kashi Vishwanath Temple Trust',
    submittedTitle: 'Annakshetra Donation Form Submitted',
  },
};

const defaultFormData = {
  name: '',
  mobile: '',
  email: '',
  donationDate: '',
  amount: '',
  pan: '',
  country: 'India',
  state: '',
  city: '',
  landmark: '',
  address: '',
  zipCode: '',
  purpose: '',
  captchaInput: '',
  agreeTerms: false,
};

const paymentLink = process.env.NEXT_PUBLIC_DONATION_PAYMENT_LINK || '/upi-scanner.jpeg';

async function notifySubmission(title, body) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!('Notification' in window)) {
    window.alert(body);
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, { body });
    return;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, { body });
      return;
    }
  }

  window.alert(body);
}

export default function DonationForm({ donationType = 'donation' }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const upiId = '9625775962-2@ybl';

  const activeConfig = donationPageConfig[donationType] || donationPageConfig.donation;

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      donationDate: new Date().toISOString().slice(0, 10),
    }));
    refreshCaptcha();
  }, []);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let generated = '';
    for (let i = 0; i < 5; i += 1) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(generated);
  };

  const resetForm = () => {
    setFormData({
      ...defaultFormData,
      donationDate: new Date().toISOString().slice(0, 10),
    });
    setErrorMessage('');
    setSuccessMessage('');
    refreshCaptcha();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setErrorMessage('Please enter a valid 10 digit mobile number.');
      return;
    }

    if (!formData.amount || Number(formData.amount) < 10) {
      setErrorMessage('Please enter donation amount of at least Rs 10.');
      return;
    }

    if (formData.captchaInput.trim().toUpperCase() !== captchaText) {
      setErrorMessage('Invalid captcha code. Please try again.');
      refreshCaptcha();
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please accept Terms and Conditions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/send-donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          donationType: activeConfig.title,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit donation form.');
      }

      await notifySubmission(
        activeConfig.submittedTitle,
        `Thank you ${formData.name}. Please complete payment of Rs ${formData.amount}.`
      );

      setSuccessMessage('Donation details submitted successfully. Please complete payment.');
      setShowQr(true);
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      await notifySubmission('Donation Form Failed', 'Your donation form could not be submitted. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="donation-page">
      <div className="content-wrap">
        <aside className="left-menu">
          <ul>
            {Object.entries(donationPageConfig).map(([key, item]) => (
              <li key={item.route} className={key === donationType ? 'active' : ''}>
                <Link href={item.route}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="right-panel">
          <h2 className="panel-title">{activeConfig.heading}</h2>
          <div className="top-strip">{activeConfig.topNote}</div>

          <div className="form-box">
            <p className="note-line">
              Note : To receive a donation slip, please follow the process below. Payment receipts eligible for tax-deductible contributions require valid contact information.
            </p>

            {errorMessage && <div className="status error">{errorMessage}</div>}
            {successMessage && <div className="status success">{successMessage}</div>}

            <form onSubmit={onSubmit}>
              <div className="grid-form">
                <FormField label="Name*">
                  <input name="name" value={formData.name} onChange={onChange} required className="input" placeholder="Enter Name" />
                </FormField>
                <FormField label="Mobile*">
                  <input name="mobile" value={formData.mobile} onChange={onChange} required className="input" placeholder="Enter Mobile" />
                </FormField>
                <FormField label="Donation Date*">
                  <input type="date" name="donationDate" value={formData.donationDate} onChange={onChange} required className="input" />
                </FormField>
                <FormField label="Email*">
                  <input type="email" name="email" value={formData.email} onChange={onChange} required className="input" placeholder="Enter Email" />
                </FormField>

                <FormField label="Amount*">
                  <input type="number" min="10" name="amount" value={formData.amount} onChange={onChange} required className="input" placeholder="Enter Amount" />
                </FormField>
                <FormField label="Pan Number">
                  <input name="pan" value={formData.pan} onChange={onChange} className="input" placeholder="Enter Pan number" />
                </FormField>
                <FormField label="Select Country*">
                  <select name="country" value={formData.country} onChange={onChange} required className="input">
                    <option value="India">India</option>
                    <option value="Nepal">Nepal</option>
                  </select>
                </FormField>
                <FormField label="Select State*">
                  <select name="state" value={formData.state} onChange={onChange} required className="input">
                    <option value="">Select State</option>
                    {indianStatesAndUts.map((stateName) => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Select City*">
                  <input name="city" value={formData.city} onChange={onChange} required className="input" placeholder="Select City" />
                </FormField>
                <FormField label="Landmark*">
                  <input name="landmark" value={formData.landmark} onChange={onChange} required className="input" placeholder="Enter Your landmark" />
                </FormField>
                <FormField label="Address*">
                  <input name="address" value={formData.address} onChange={onChange} required className="input" placeholder="Enter Your Address" />
                </FormField>
                <FormField label="Zip/Postal Code*">
                  <input name="zipCode" value={formData.zipCode} onChange={onChange} required className="input" placeholder="Enter Zip/Postal Code" />
                </FormField>

                <FormField label="Purpose of Donation">
                  <input name="purpose" value={formData.purpose} onChange={onChange} className="input" placeholder="Enter Purpose of Donation" />
                </FormField>
                <FormField label="Captcha Code*">
                  <div className="captcha-box" role="img" aria-label="captcha code">
                    <span>{captchaText.slice(0, 2)}</span>
                    <span>{captchaText.slice(2)}</span>
                  </div>
                </FormField>
                <FormField label="Enter Captcha*">
                  <input
                    name="captchaInput"
                    value={formData.captchaInput}
                    onChange={onChange}
                    required
                    className="input"
                    placeholder="Enter Captcha Code"
                  />
                </FormField>
              </div>

              <button type="button" className="refresh-captcha" onClick={refreshCaptcha}>
                Refresh Captcha
              </button>

              <label className="terms">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={onChange}
                />
                <span>I have read the Terms and Conditions and hereby agree to the same.</span>
              </label>

              <div className="btn-row">
                <button type="submit" disabled={isSubmitting} className="btn green">
                  {isSubmitting ? 'Submitting...' : 'Proceed to Donate'}
                </button>
                <button type="button" onClick={resetForm} className="btn red">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showQr && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-orange-800">Complete Your Payment</h3>
            <p className="mt-2 text-sm text-gray-600">Select your preferred payment method</p>
            
            {!selectedPaymentMethod ? (
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setSelectedPaymentMethod('phonepe')}
                  className="w-full rounded-lg border-2 border-purple-500 bg-purple-50 px-4 py-3 font-semibold text-purple-700 hover:bg-purple-100"
                >
                  💜 PhonePe
                </button>
                <button
                  onClick={() => setSelectedPaymentMethod('googlepay')}
                  className="w-full rounded-lg border-2 border-blue-500 bg-blue-50 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-100"
                >
                  💙 Google Pay
                </button>
                <button
                  onClick={() => setSelectedPaymentMethod('paytm')}
                  className="w-full rounded-lg border-2 border-cyan-500 bg-cyan-50 px-4 py-3 font-semibold text-cyan-700 hover:bg-cyan-100"
                >
                  💎 PayTM
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-700">
                  Send payment of <span className="font-bold">₹{formData.amount}</span> to:
                </p>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-xs text-gray-600 mb-2">UPI ID</p>
                  <p className="text-lg font-bold text-gray-800 break-all">{upiId}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(upiId);
                      alert('UPI ID copied to clipboard!');
                    }}
                    className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Copy UPI ID
                  </button>
                </div>
                <a
                  href={`upi://pay?pa=${upiId}&pn=KashiDarshan&am=${formData.amount}&tn=Donation`}
                  className="mt-4 inline-block rounded-lg bg-orange-600 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  Open in App
                </a>
                <button
                  onClick={() => setSelectedPaymentMethod('')}
                  className="mt-2 block w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Change Payment Method
                </button>
              </div>
            )}
            
            <button
              onClick={() => {
                setShowQr(false);
                setSelectedPaymentMethod('');
              }}
              className="mt-4 block w-full rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}

function FormField({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-gray-800">{label}</label>
      {children}
    </div>
  );
}
