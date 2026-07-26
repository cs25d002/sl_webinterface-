import { FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import heroBackgroundVideo from '../../assets/hero-background.mp4';
import './HeroSection.css';

export function HeroSection() {
  return (
    <section className="hero">
      <video
        className="hero__bg-video"
        src={heroBackgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Swasthyalekha</span>
          <h1 className="hero__title">Transforming Healthcare Records into Intelligent Digital Systems</h1>
          <p className="hero__description">
            Swasthyalekha develops secure, intelligent, and human-centred technologies for digitizing, organizing,
            and using healthcare information.
          </p>
          <div className="hero__actions">
            <PrimaryButton to="/services">Explore Our Services</PrimaryButton>
            <SecondaryButton to="/#about">Learn About Us</SecondaryButton>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card hero__card--main">
            <FileText size={30} />
            <span>Clinical Record Digitization</span>
          </div>
          <div className="hero__card hero__card--float-1">
            <ShieldCheck size={22} />
            <span>Privacy-Aware Systems</span>
          </div>
          <div className="hero__card hero__card--float-2">
            <Sparkles size={22} />
            <span>Intelligent Processing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
