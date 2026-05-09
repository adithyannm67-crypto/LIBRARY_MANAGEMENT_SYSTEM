import "./cta.css"


export default function Cta({ router }) {
  return (
<section id="contact" className="cta">
  <div className="cta-container">

    <h2 className="cta-title">
      Ready to Transform Your Library?
    </h2>

    <p className="cta-text">
      Join thousands of libraries using Dora to streamline operations and
      enhance member experience
    </p>

    <div className="cta-buttons">
      <button
        onClick={() => router.push("/auth")}
        className="cta-btn-primary"
      >
        Start Free 30-Day Trial
      </button>

      <button className="cta-btn-outline">
        Schedule a Demo
      </button>
    </div>

  </div>
</section>
  );
}
