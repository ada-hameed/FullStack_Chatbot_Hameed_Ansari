import { useEffect, useState } from "react";
import EnquiryForm from "./components/EnquiryForm";
import Chatbot from "./components/Chatbot";
import "./styles.css";

type Page = "home" | "services" | "courses" | "projects" | "contact";

const services = [
  { no: "01", title: "Aerial Photo & Video", image: "/wp-content/uploads/2026/03/service1.webp", text: "Professional aerial photography and cinematic drone video for real estate, events, brands, infrastructure and promotional campaigns." },
  { no: "02", title: "Mapping & Surveying", image: "/wp-content/uploads/2026/03/service2.webp", text: "Accurate aerial mapping, land surveys, site measurements, progress tracking and visual reports for planning and construction." },
  { no: "03", title: "Inspections & Monitoring", image: "/wp-content/uploads/2026/03/service3.webp", text: "Safer visual inspections for rooftops, towers, solar sites, construction projects and hard-to-reach assets." },
  { no: "04", title: "Drone Training", image: "/wp-content/uploads/2026/03/service4.webp", text: "Practical training for aspiring pilots and professionals covering safe operations, flight planning and real project workflows." },
  { no: "05", title: "Drone Consulting", image: "/wp-content/uploads/2026/03/service5.webp", text: "Guidance on drone selection, project planning, operational workflows and using aerial technology for business needs." },
  { no: "06", title: "Custom Drone Solutions", image: "/wp-content/uploads/2026/03/service6.webp", text: "End-to-end drone support for businesses that need a tailored aerial imaging, data collection or inspection solution." },
];

const courses = [
  ["Drone Pilot Fundamentals", "Learn flight basics, safety, controls, mission planning and practical operating procedures."],
  ["Aerial Mapping & Survey", "Build practical skills in drone mapping, image capture, survey workflows and project reporting."],
  ["Professional Drone Operations", "Understand professional workflows, pre-flight planning, site assessment and client-ready delivery."],
];

const projects = [
  ["Real Estate Aerial Showcase", "/wp-content/uploads/2026/03/portfolio1.webp", "Aerial photography and video packages designed to showcase properties from a powerful new perspective."],
  ["Construction Site Mapping", "/wp-content/uploads/2026/03/portfolio2.webp", "Regular aerial captures and mapping outputs to monitor site progress and support project communication."],
  ["Infrastructure Inspection", "/wp-content/uploads/2026/03/portfolio3.webp", "High-quality visual inspection support for assets where safer access and detailed aerial views matter."],
  ["Brand & Event Coverage", "/wp-content/uploads/2026/03/portfolio4.webp", "Cinematic drone footage for campaigns, events, launches and digital marketing content."],
];

function navigate(path: Page) {
  const url = path === "home" ? "/" : `/${path}`;
  window.history.pushState({}, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Header({ page }: { page: Page }) {
  const [mobile, setMobile] = useState(false);
  const links: [Page, string][] = [["home", "Home"], ["services", "Services"], ["courses", "Courses"], ["projects", "Projects"], ["contact", "Contact"]];
  return <header className="dronetv-site-header">
    <div className="dronetv-header-inner">
      <button className="dronetv-brand" onClick={() => navigate("home")} aria-label="DroneTV Home">
        <img src="/wp-content/uploads/2026/03/dronLogo2.png" alt="DroneTV" />
      </button>
      <nav className={`dronetv-nav ${mobile ? "mobile-open" : ""}`}>
        {links.map(([key, label]) => <button key={key} className={page === key ? "active" : ""} onClick={() => { setMobile(false); navigate(key); }}>{label}</button>)}
      </nav>
      <button className="dronetv-header-cta" onClick={() => navigate("contact")}>Get Started →</button>
      <button className="dronetv-mobile-toggle" onClick={() => setMobile(v => !v)} aria-label="Open menu">☰</button>
    </div>
  </header>;
}

function Footer() {
  return <footer className="dronetv-footer">
    <div className="dronetv-footer-grid">
      <div><img src="/wp-content/uploads/2026/03/dronLogo2.png" alt="DroneTV" className="dronetv-footer-logo"/><p>Professional drone services, aerial intelligence and practical training for modern businesses and aspiring pilots.</p></div>
      <div><h4>Explore</h4><button onClick={() => navigate("services")}>Services</button><button onClick={() => navigate("courses")}>Courses & Training</button><button onClick={() => navigate("projects")}>Projects</button></div>
      <div><h4>Contact</h4><p>Mumbai, India</p><p>hello@dronetv.in</p><p>+91 90000 00000</p></div>
    </div>
    <div className="dronetv-footer-bottom">© 2026 DroneTV. All rights reserved.</div>
  </footer>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="dronetv-section-heading"><span className="dronetv-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>;
}

function Home() {
  return <main>
    <section className="dronetv-hero">
      <div className="dronetv-hero-copy"><span className="dronetv-eyebrow">DRONE TECHNOLOGY & SERVICES</span><h1>Power Your Business <span>From Above</span></h1><p>Professional drone solutions for aerial imaging, mapping, inspections, training and smarter business decisions.</p><button className="dronetv-primary" onClick={() => navigate("contact")}>Get Started →</button></div>
      <div className="dronetv-hero-image"><img src="/wp-content/uploads/2026/03/h1_drone.webp" alt="DroneTV professional drone" /></div>
    </section>
    <section className="dronetv-intro"><SectionTitle eyebrow="DRONETV SERVICES" title="Innovative and Efficient Drone Services" text="From capturing high-impact aerial visuals to collecting useful site data, DroneTV helps businesses use drones as a practical tool."/><div className="dronetv-service-grid">{services.slice(0,3).map(s => <ServiceCard key={s.no} service={s}/>)}</div><button className="dronetv-outline" onClick={() => navigate("services")}>View All Services →</button></section>
    <section className="dronetv-dark-band"><div><span className="dronetv-eyebrow">WHY DRONETV</span><h2>Better visibility. Safer operations. Smarter decisions.</h2><p>We combine practical drone operations with reliable aerial data so teams can see more, plan better and communicate project progress clearly.</p></div><div className="dronetv-number-grid"><div><strong>01</strong><span>Professional workflows</span></div><div><strong>02</strong><span>Practical training</span></div><div><strong>03</strong><span>Business-focused results</span></div></div></section>
    <section className="dronetv-courses-section"><SectionTitle eyebrow="COURSES & TRAINING" title="Learn Drone Skills That Work In The Real World" text="Hands-on learning paths for students, beginners and professionals who want practical drone knowledge."/><div className="dronetv-course-grid">{courses.map((c,i)=><article className="dronetv-course-card" key={c[0]}><div className="dronetv-course-icon">0{i+1}</div><h3>{c[0]}</h3><p>{c[1]}</p><button className="dronetv-course-link" onClick={() => navigate("contact")}>Enquire About Course <span>→</span></button></article>)}</div></section>
    <section className="dronetv-cta"><div><span className="dronetv-eyebrow">READY TO START?</span><h2>Have a project or want to learn?</h2><p>Tell us what you need and the DroneTV team will help you choose the right service or training path.</p></div><button className="dronetv-primary" onClick={() => navigate("contact")}>Send An Enquiry →</button></section>
  </main>;
}

function ServiceCard({ service }: { service: typeof services[number] }) { return <article className="dronetv-service-card"><div className="dronetv-card-image"><img src={service.image} alt={service.title}/><span>{service.no}</span></div><div className="dronetv-card-body"><h3>{service.title}</h3><p>{service.text}</p><button onClick={() => navigate("contact")}>Discuss This Service →</button></div></article>; }

function Services() { return <main className="dronetv-page"><div className="dronetv-page-hero"><span className="dronetv-eyebrow">WHAT WE DO</span><h1>Drone Services For Real Business Needs</h1><p>Reliable aerial capture, mapping, inspection and consulting services designed around your project.</p></div><section className="dronetv-section"><div className="dronetv-service-grid six">{services.map(s => <ServiceCard key={s.no} service={s}/>)}</div></section><section className="dronetv-dark-band compact"><div><span className="dronetv-eyebrow">FROM IDEA TO DELIVERY</span><h2>Plan. Capture. Process. Deliver.</h2><p>We focus on clear project requirements, safe operations and useful outputs rather than simply collecting drone footage.</p></div></section></main>; }

function Courses() { return <main className="dronetv-page"><div className="dronetv-page-hero"><span className="dronetv-eyebrow">DRONETV ACADEMY</span><h1>Courses & Professional Drone Training</h1><p>Build practical skills through structured learning focused on safe flight, aerial data and real project workflows.</p></div><section className="dronetv-section"><div className="dronetv-course-grid">{courses.map((c,i)=><article className="dronetv-course-card large" key={c[0]}><div className="dronetv-course-icon">0{i+1}</div><h3>{c[0]}</h3><p>{c[1]}</p><ul><li>Instructor-led practical sessions</li><li>Safety and mission planning</li><li>Real-world project examples</li><li>Guidance for next steps</li></ul><button className="dronetv-primary" onClick={() => navigate("contact")}>Enquire Now →</button></article>)}</div></section><section className="dronetv-training-strip"><div><h2>Not sure which course fits you?</h2><p>Tell us your current experience and goal. We can recommend a suitable starting point.</p></div><button className="dronetv-outline" onClick={() => navigate("contact")}>Talk To DroneTV →</button></section></main>; }

function Projects() { return <main className="dronetv-page"><div className="dronetv-page-hero"><span className="dronetv-eyebrow">OUR WORK</span><h1>Projects Powered By Aerial Perspective</h1><p>Examples of how drone technology can support marketing, construction, inspection and visual storytelling.</p></div><section className="dronetv-section"><div className="dronetv-project-grid">{projects.map(p=><article className="dronetv-project-card" key={p[0]}><img src={p[1]} alt={p[0]}/><div><span className="dronetv-eyebrow">DRONETV PROJECT</span><h3>{p[0]}</h3><p>{p[2]}</p><button onClick={() => navigate("contact")}>Discuss A Similar Project →</button></div></article>)}</div></section></main>; }

function Contact() { return <main className="dronetv-page"><div className="dronetv-page-hero"><span className="dronetv-eyebrow">CONTACT DRONETV</span><h1>Let's Talk About Your Requirement</h1><p>Looking for drone services, training or a custom aerial solution? Send us your details and our team will get back to you.</p></div><section className="dronetv-enquiry-section"><div className="dronetv-enquiry-inner"><SectionTitle eyebrow="ENQUIRY FORM" title="Tell Us What You Need" text="Fill in the form and select the service or course you are interested in."/><EnquiryForm/></div></section></main>; }

function getPage(): Page { const p = window.location.pathname.replace(/^\//, "").split("/")[0]; return (["services","courses","projects","contact"] as string[]).includes(p) ? p as Page : "home"; }

export default function App() {
  const [page, setPage] = useState<Page>(getPage());
  useEffect(() => { const onPop = () => setPage(getPage()); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);
  return <div className="dronetv-app"><Header page={page}/>{page === "home" && <Home/>}{page === "services" && <Services/>}{page === "courses" && <Courses/>}{page === "projects" && <Projects/>}{page === "contact" && <Contact/>}<Footer/><Chatbot/></div>;
}
