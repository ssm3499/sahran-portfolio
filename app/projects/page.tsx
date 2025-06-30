export default function ProjectsPage() {
  return (
    <section>
      <h1 className="heading-large">Projects & Experience</h1>

      <div className="project-grid">
        {/* Nixor Student Government / President */}
        <div className="project-card">
          <div className="project-title">Nixor Student Government / President</div>
          <div className="project-date">1700+ hours</div>
          <ul className="project-description list">
            <li>Managed and coordinated events for 2,000+ students</li>
            <li>Bridged communication between administration and the student body</li>
            <li>Strengthened relationships with sponsors and guests</li>
            <li>Resolved conflict within the team and inspired team building</li>
          </ul>
        </div>

        {/* Nixor Financial Services / Chief Operating Officer */}
        <div className="project-card">
          <div className="project-title">Nixor Financial Services / COO</div>
          <div className="project-date">1050+ hours</div>
          <ul className="project-description list">
            <li>Mentored 100+ volunteers in educational programs</li>
            <li>Established communication channels with 20+ external parties</li>
            <li>Contributed to strategic planning and project initiation</li>
          </ul>
        </div>

        {/* Nixor Financial Services / Intern */}
        <div className="project-card">
          <div className="project-title">Nixor Financial Services / Intern</div>
          <div className="project-date">1100+ hours</div>
          <ul className="project-description list">
            <li>Evaluated the stock market and compiled reports</li>
            <li>Assessed potential investments</li>
            <li>Hosted a citywide financial competition for 200+ participants</li>
            <li>Led initiatives to assist community members launching small businesses</li>
          </ul>
        </div>

        {/* Regatta */}
        <div className="project-card">
          <div className="project-title">Regatta</div>
          <div className="project-date">December 2023</div>
          <ul className="project-description list">
            <li>Organized logistics, beach huts, and safety protocols for a rafting competition</li>
            <li>Led marketing, sponsorship liaison, and volunteer delegation</li>
          </ul>
        </div>

        {/* Beat the Stigma */}
        <div className="project-card">
          <div className="project-title">Beat the Stigma</div>
          <div className="project-date">September 2023</div>
          <ul className="project-description list">
            <li>Coordinated stress-relief activities with vendors and instructors</li>
            <li>Managed procurement and delegation for art and wellness sessions</li>
          </ul>
        </div>

        {/* Overnight Orientation */}
        <div className="project-card">
          <div className="project-title">Overnight Orientation</div>
          <div className="project-date">August 2023</div>
          <ul className="project-description list">
            <li>Delegated tasks among volunteers for a campus acclimation event</li>
            <li>Handled food logistics, vendor coordination, and administration liaison</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
