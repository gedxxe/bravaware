
import React from 'react';
import GlassCard from './common/GlassCard';
import { FOUNDERS_DATA } from '../constants';

// SVG Icons for social media
const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.504.012-4.726.068-2.733.125-3.958 1.353-4.08 4.08-.056 1.222-.067 1.583-.067 4.726s.011 3.504.067 4.726c.122 2.727 1.347 3.956 4.08 4.08 1.222.056 1.585.068 4.726.068s3.504-.012 4.726-.068c2.733-.125 3.958-1.353 4.08-4.08.056-1.222.067-1.583.067-4.726s-.011-3.504-.067-4.726c-.122-2.727-1.347-3.956-4.08-4.08-1.222-.056-1.585-.068-4.726-.068zm0 5.831a3.171 3.171 0 100 6.342 3.171 3.171 0 000-6.342zm0 8.139a4.968 4.968 0 110-9.936 4.968 4.968 0 010 9.936zM16.949 6.862a1.223 1.223 0 100-2.446 1.223 1.223 0 000 2.446z" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 3.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-2.199 1.564-4.016 3.49-4.016 1.927 0 3.509 1.817 3.509 4.016V24h5v-9.35c0-4.698-2.6-8.65-6.5-8.65-3.003 0-4.505 2.053-4.505 2.053V8z" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-3 text-gray-300 hover:text-[#7a5af7] transition-colors duration-200"
    aria-label={`Contact via ${label}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

const CONTACT_INFO = {
  founder1: { // I Gede Bagus Jayendra
    instagram: "https://www.instagram.com/gedebagus_jayendra/",
    linkedin: "https://www.linkedin.com/in/igede/",
    email: "gedeelectro@gmail.com"
  },
  founder2: { // Nasywa Khairunnisa Febriyanka
    instagram: "https://www.instagram.com/huntedbyschafer/",
    linkedin: "http://linkedin.com/in/nasywa-kf",
    email: "nasywafebriyanka79@gmail.com"
  }
};

const ContactUsSection: React.FC = () => {
  return (
    <section id="contact-us" className="py-12">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-violet-300">
        Get In Touch
      </h2>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {FOUNDERS_DATA.map((founder) => {
          const contactDetails = CONTACT_INFO[founder.id as keyof typeof CONTACT_INFO];
          return (
            <GlassCard key={founder.id} className="h-full flex flex-col p-8 transition-all duration-300 hover:border-[#7a5af7] hover:shadow-[0_0_25px_rgba(122,90,247,0.4)]">
              <div className="flex items-center mb-6">
                <img 
                  src={founder.imageUrl} 
                  alt={founder.name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-md"
                />
                <div className="ml-5">
                  <h3 className="text-2xl font-semibold text-white">{founder.name}</h3>
                  <p className="text-md text-[#e18aaa] font-medium">{founder.role}</p>
                </div>
              </div>

              <div className="space-y-4 mt-auto pt-6 border-t border-white/10">
                <ContactLink href={contactDetails.instagram} icon={<InstagramIcon />} label="Instagram" />
                <ContactLink href={contactDetails.linkedin} icon={<LinkedInIcon />} label="LinkedIn" />
                <ContactLink href={`mailto:${contactDetails.email}`} icon={<EmailIcon />} label="Email" />
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};

export default ContactUsSection;
