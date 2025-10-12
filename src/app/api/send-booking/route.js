// src/app/api/send-booking/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, checkIn, checkOut, roomType, templePackage, guests, specialRequests } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'amresh2537kumar@gmail.com',
      subject: `📅 KashiDarshan Booking - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #D2691E, #8B4513); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #D2691E; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🛕 KashiDarshan</h1>
                    <h2>New Booking Request</h2>
                </div>
                
                <div class="content">
                    <div class="section">
                        <h3>👤 Customer Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                    </div>

                    <div class="section">
                        <h3>📅 Booking Details</h3>
                        <p><strong>Check-in:</strong> ${checkIn}</p>
                        <p><strong>Check-out:</strong> ${checkOut}</p>
                        <p><strong>Guests:</strong> ${guests}</p>
                        <p><strong>Room Type:</strong> ${roomType === 'ac' ? 'AC Room (2399/- per day)' : 'Non-AC Room (1699/- per day)'}</p>
                        <p><strong>Temple Package:</strong> ${getTemplePackageName(templePackage)}</p>
                    </div>

                    <div class="section">
                        <h3>💫 Special Requests</h3>
                        <p>${specialRequests || 'No special requests'}</p>
                    </div>

                    <div class="section">
                        <h3>💰 Estimated Price</h3>
                        <p style="font-size: 18px; color: #D2691E; font-weight: bold;">₹${calculatePrice(roomType, templePackage)}/-</p>
                    </div>
                </div>

                <div class="footer">
                    <p>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                    <p>KashiDarshan Booking System</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Booking request sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}

// Helper functions
function getTemplePackageName(packageType) {
  switch(packageType) {
    case 'kal-bhairav': return 'Kal Bhairav Mandir (4599/-)';
    case 'sankat-mochan': return 'Sankat Mochan (6500/-)';
    case 'complete': return 'Complete Temple Tour (7500/-)';
    default: return 'Not selected';
  }
}

function calculatePrice(roomType, templePackage) {
  let total = 0;
  
  if (roomType === 'ac') total += 2399;
  else if (roomType === 'non-ac') total += 1699;
  
  if (templePackage === 'kal-bhairav') total += 4599;
  else if (templePackage === 'sankat-mochan') total += 6500;
  else if (templePackage === 'complete') total += 7500;
  
  return total;
}