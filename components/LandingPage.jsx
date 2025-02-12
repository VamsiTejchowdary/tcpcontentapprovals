"use client";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="landing-page">
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body, html {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .landing-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(to right, #1a1a2e, #16213e);
          height: 100vh;
          width: 100vw;
          color: white;
          font-family: "Segoe UI", sans-serif;
          padding: 20px;
        }
        .container {
          max-width: 900px;
          width: 100%;
        }
        .header {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #ff6f61;
        }
        .sections {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
          width: 100%;
        }
        .section {
          background: #0f3460;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          text-align: center;
          flex: 1;
          transition: transform 0.3s ease-in-out;
        }
        .section:hover {
          transform: translateY(-5px);
        }
        .section h2 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: #ff6f61;
        }
        .section p {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #dcdcdc;
        }
        .cta-button {
          background-color: #ff6f61;
          padding: 12px 30px;
          font-size: 1.2rem;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.3s;
        }
        .cta-button:hover {
          background-color: #f14b42;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 0.9rem;
          color: #ccc;
        }
        @media (max-width: 768px) {
          .sections {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="header">True Choice Pack Content Approval</div>

      {/* Sections for USA and Indian Teams */}
      <div className="sections">
        
        {/* USA Team Section */}
        <div className="section">
          <h2>USA Team - Review & Approve</h2>
          <p>Check and approve the latest content submitted by the Indian team.</p>
          <button className="cta-button" onClick={() => router.push("/us-approval")}>
            Go to Approval Page
          </button>
        </div>

        {/* Indian Team Section */}
        <div className="section">
          <h2>Indian Team - Submit Content</h2>
          <p>Write and submit new content for review and approval.</p>
          <button className="cta-button" onClick={() => router.push("/indianteam")}>
            Submit Content
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 TrueChoicePack Content Approval. All rights reserved.</p>
      </footer>

      <ToastContainer />
    </div>
  );
}