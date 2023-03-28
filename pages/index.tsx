import Link from "next/link";

export default function Home() {
  return (
    <div
      className="hero landing-page"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1550482781-48d477e61c72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Welcome to our Referral Program for QR Code Applications! Are you
            looking for a simple and efficient way to promote your QR code
            application? Our Referral Program is the perfect solution for you!
            With our program, you can easily refer your friends, colleagues, or
            anyone who might be interested in using your application
          </p>
          <Link className="btn" href="/register">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
