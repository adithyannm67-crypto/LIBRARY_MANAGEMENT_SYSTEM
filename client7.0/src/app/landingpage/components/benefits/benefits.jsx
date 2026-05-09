
import { Zap, Shield, Smartphone } from "lucide-react";
import "./benefits.css"

export default function Benefits() {
  return (
   <section id="about" className="about">
  <div className="about-container">

    <div className="about-grid">

      {/* Left */}
      <div>
        <h2 className="about-title">Why Choose Dora?</h2>

        <p className="about-description">
          Trusted by over 2,000 libraries worldwide, Dora combines ease of
          use with powerful functionality to help you deliver exceptional
          library services.
        </p>

        <div className="about-features">

          <div className="about-feature">
            <div className="about-icon-box">
              <Zap className="about-icon" />
            </div>
            <div>
              <h4 className="about-feature-title">Lightning Fast</h4>
              <p className="about-feature-text">
                Process checkouts and returns in seconds with our optimized system
              </p>
            </div>
          </div>

          <div className="about-feature">
            <div className="about-icon-box">
              <Shield className="about-icon" />
            </div>
            <div>
              <h4 className="about-feature-title">Secure & Reliable</h4>
              <p className="about-feature-text">
                Bank-level security with automatic backups and 99.9% uptime
              </p>
            </div>
          </div>

          <div className="about-feature">
            <div className="about-icon-box">
              <Smartphone className="about-icon" />
            </div>
            <div>
              <h4 className="about-feature-title">Mobile Ready</h4>
              <p className="about-feature-text">
                Access your library from anywhere with our responsive design
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right */}
      <div className="about-stats">
        <div className="about-stats-inner">

          <div className="stat-card">
            <div className="stat-number">2,000+</div>
            <div className="stat-label">Active Libraries</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Books Cataloged</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Customer Satisfaction</div>
          </div>

        </div>
      </div>

    </div>

  </div>
</section>
  );
}
