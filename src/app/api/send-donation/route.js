import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      name,
      mobile,
      email,
      donationDate,
      amount,
      pan,
      country,
      state,
      city,
      landmark,
      address,
      zipCode,
      purpose,
      donationType,
      agreeTerms,
    } = payload;

    const cleanName = safeText(name, 100);
    const cleanMobile = safeText(mobile, 20);
    const cleanEmail = safeText(email, 120);
    const cleanDate = safeText(donationDate, 20);
    const cleanPan = safeText(pan, 20);
    const cleanCountry = safeText(country, 50);
    const cleanState = safeText(state, 50);
    const cleanCity = safeText(city, 60);
    const cleanLandmark = safeText(landmark, 160);
    const cleanAddress = safeText(address, 220);
    const cleanZipCode = safeText(zipCode, 20);
    const cleanPurpose = safeText(purpose, 220);
    const cleanDonationType = safeText(donationType, 60) || 'Donation';
    const numericAmount = Number(amount);

    if (!cleanName || !cleanMobile || !cleanEmail || !cleanDate || !cleanAddress || !cleanState || !cleanCity || !cleanZipCode || Number.isNaN(numericAmount)) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(cleanMobile)) {
      return NextResponse.json(
        { success: false, message: 'Invalid mobile number' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (numericAmount < 10) {
      return NextResponse.json(
        { success: false, message: 'Donation amount must be at least Rs 10' },
        { status: 400 }
      );
    }

    if (!agreeTerms) {
      return NextResponse.json(
        { success: false, message: 'Please accept terms and conditions' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'amresh2537kumar@gmail.com',
      subject: `${cleanDonationType} Submission - ${cleanName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
          <div style="background: #ea580c; color: #fff; padding: 18px 20px;">
            <h2 style="margin: 0;">KashiDarshan ${escapeHtml(cleanDonationType)} Form</h2>
            <p style="margin: 8px 0 0; font-size: 14px;">A new donation form has been submitted.</p>
          </div>
          <div style="padding: 20px; background: #fff;">
            <h3 style="margin: 0 0 10px; color: #9a3412;">Donor Details</h3>
            <p><strong>Donation Type:</strong> ${escapeHtml(cleanDonationType)}</p>
            <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
            <p><strong>Mobile:</strong> ${escapeHtml(cleanMobile)}</p>
            <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
            <p><strong>Donation Date:</strong> ${escapeHtml(cleanDate)}</p>
            <p><strong>Amount:</strong> Rs ${escapeHtml(String(numericAmount))}</p>
            <p><strong>PAN:</strong> ${escapeHtml(cleanPan || 'Not provided')}</p>
            <p><strong>Country:</strong> ${escapeHtml(cleanCountry || 'Not provided')}</p>
            <p><strong>State:</strong> ${escapeHtml(cleanState)}</p>
            <p><strong>City:</strong> ${escapeHtml(cleanCity)}</p>
            <p><strong>Landmark:</strong> ${escapeHtml(cleanLandmark || 'Not provided')}</p>
            <p><strong>Address:</strong> ${escapeHtml(cleanAddress)}</p>
            <p><strong>Zip/Postal Code:</strong> ${escapeHtml(cleanZipCode)}</p>
            <p><strong>Purpose:</strong> ${escapeHtml(cleanPurpose || 'Not provided')}</p>
          </div>
          <div style="padding: 14px 20px; background: #f8fafc; color: #64748b; font-size: 12px;">
            Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </div>
        </div>
      `,
    };

    let mailSent = false;
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });
        await transporter.sendMail(mailOptions);
        mailSent = true;
      } catch (emailError) {
        console.error('Donation email send failed:', emailError);
      }
    } else {
      console.warn('Donation email skipped: GMAIL_USER/GMAIL_APP_PASSWORD not configured.');
    }

    return NextResponse.json(
      {
        success: true,
        mailSent,
        message: 'Donation request submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending donation email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send donation request' },
      { status: 500 }
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}
