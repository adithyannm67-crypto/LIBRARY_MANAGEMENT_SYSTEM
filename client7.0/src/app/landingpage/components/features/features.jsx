import { Search, Users, BarChart3, Clock } from "lucide-react";
import "./features.css"
export default function Features() {
  return (
   <section id="features" className="features">
  <div className="features-container">

    <div className="features-header">
      <h2 className="features-title">Powerful Features</h2>
      <p className="features-subtitle">
        Everything you need to manage your library efficiently
      </p>
    </div>

    <div className="features-grid">

      <div className="feature-card">
        <div className="feature-icon-box">
          <Search className="feature-icon" />
        </div>
        <h3 className="feature-title">Smart Catalog</h3>
        <p className="feature-text">
          Advanced search and cataloging system with barcode scanning and ISBN lookup
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon-box">
          <Users className="feature-icon" />
        </div>
        <h3 className="feature-title">Member Management</h3>
        <p className="feature-text">
          Track members, borrowing history, and automate notifications and reminders
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon-box">
          <BarChart3 className="feature-icon" />
        </div>
        <h3 className="feature-title">Analytics & Reports</h3>
        <p className="feature-text">
          Comprehensive insights into circulation, popular books, and usage patterns
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon-box">
          <Clock className="feature-icon" />
        </div>
        <h3 className="feature-title">Automated Workflows</h3>
        <p className="feature-text">
          Set up automatic reminders, overdue notices, and reservation management
        </p>
      </div>

    </div>

  </div>
</section>
  );
}
