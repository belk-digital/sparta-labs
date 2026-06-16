import React from 'react';
import { FlaskConical, FileText, BadgeCheck } from 'lucide-react';
import './TrustBadges.css';

const TrustBadges = () => {
  return (
    <section className="trust-badges-section">
      <div className="container trust-badges">
        <div className="badge badge-first">
          <h3 className="badge-title-first">Verified</h3>
          <h3 className="badge-title-light-first">Quality</h3>
        </div>
        
        <div className="badge with-icon">
          <FlaskConical size={24} strokeWidth={1.2} />
          <span className="badge-text">Third-party</span>
          <span className="badge-subtext">Lab Tested</span>
        </div>

        <div className="badge with-icon">
          <FileText size={24} strokeWidth={1.2} />
          <span className="badge-text">COA</span>
          <span className="badge-subtext">Available By Batch</span>
        </div>

        <div className="badge with-icon">
          <BadgeCheck size={24} strokeWidth={1.2} />
          <span className="badge-text">&ge;99%</span>
          <span className="badge-subtext">Purity Standard</span>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
