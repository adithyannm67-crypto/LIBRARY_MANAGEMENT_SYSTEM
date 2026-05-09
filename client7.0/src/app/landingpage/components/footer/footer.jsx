
import { BookOpen } from "lucide-react";
import "./footer.css"


export default function Footer() {
  return (
   <footer className="footer">
  <div className="footer-container">

    <div className="footer-grid">
      
      <div>
        <div className="footer-brand">
          <BookOpen className="footer-icon" />
          <span className="footer-logo">Dora Library</span>
        </div>
        <p className="footer-text">
          Modern library management for the digital age
        </p>
      </div>

      <div>
        <h4 className="footer-heading">Product</h4>
        <ul className="footer-list">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Demo</a></li>
        </ul>
      </div>

      <div>
        <h4 className="footer-heading">Company</h4>
        <ul className="footer-list">
          <li><a href="#">About</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>

      <div>
        <h4 className="footer-heading">Support</h4>
        <ul className="footer-list">
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </div>

    </div>

    <div className="footer-bottom">
      © 2026 Dora Library Management System. All rights reserved.
    </div>

  </div>
</footer>
  );
}
