import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Setting an async function to send a message via nodemailer
export async function POST(req) {
  // setting a body of message
  const data = await req.json();

  const message = {
    to: `${data.email}`,
    from: process.env.SMTP_USER,
    subject: `Bestätigung Anfrage Clubbery Kontaktformular`,
    text: `Vielen Dank für deine Nachricht ${data.firstname}, wir freuen uns von dir zu hören! \n\nUnser Support-Team wird sich schnellstmöglich mit dir in Verbindung setzen.\n\nMit freundlichen Grüßen\nDein Clubbery Support\n\n So lautet die Nachricht, welche wir von dir erhalten haben:\n\n${data.message}`,
  };

  const supportMessage = {
    to: `support@clubbery.com`,
    from: process.env.SMTP_USER,
    subject: `Neue Anfrage von ${data.firstname} ${data.lastname}`,
    text: `Titel: Anfrage Clubbery Kontaktformular\n\nKundendaten: ${data.email}, ${data.firstname} ${data.lastname}\n\nNachricht: ${data.message}}`,
  };

  // setting a properties for nodemailer
  const transporter = nodemailer.createTransport({
    host: String(process.env.SMTP_HOST),
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Condition to check content of message

  if (req.method === "POST") {
    if (!data.email || !data.message || !data.firstname) {
      return NextResponse.json({ message: "Bad request!" }, { status: 400 });
    }
    // defining an async function to send a message
    try {
      await transporter.sendMail(message);
      await transporter.sendMail(supportMessage);
      return NextResponse.json({ success: true }, { status: 200 });
      //gandling an error
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Bad request!" }, { status: 400 });
    }
  }
  // Returning a http status
  return NextResponse.json({ message: "Bad request!" }, { status: 400 });
}
