import { Link } from 'react-router-dom';
import { primaryNavLinks } from '../data/navigation';
import logoIcon from '../assets/logo-icon.png';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <img src={logoIcon} alt="" className="site-footer__logo-mark" />
            <span>Swasthyalekha</span>
          </div>
          <p>
            Swasthyalekha develops secure, intelligent, and human-centred technologies for digitizing, organizing,
            and using healthcare information.
          </p>
        </div>

        <div className="site-footer__column">
          <h3>Navigation</h3>
          <ul>
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Resources</h3>
          <ul>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <span className="site-footer__placeholder">Privacy Policy (coming soon)</span>
            </li>
            <li>
              <span className="site-footer__placeholder">Terms of Service (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>&copy; {year} Swasthyalekha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
