import { Mail, MapPin, Phone } from 'lucide-react';
import { contactDetails } from '../../data/contact';
import { SectionHeading } from '../../components/SectionHeading';
import './ContactSection.css';

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Get in Touch" />
        <div className="contact-grid">
          <div className="contact-grid__item">
            <Mail size={20} />
            <div>
              <h3>Email</h3>
              <p>{contactDetails.email}</p>
            </div>
          </div>
          <div className="contact-grid__item">
            <Phone size={20} />
            <div>
              <h3>Phone</h3>
              <p>{contactDetails.phone}</p>
            </div>
          </div>
          <div className="contact-grid__item">
            <MapPin size={20} />
            <div>
              <h3>Office</h3>
              <p>{contactDetails.address}</p>
            </div>
          </div>
        </div>
        <div className="contact-social">
          {contactDetails.social.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
