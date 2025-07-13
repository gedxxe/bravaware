import React from 'react';
import { APP_NAME, FOUNDERS_DATA, CONTACT_INFO } from '../constants';

// Icons are self-contained for simplicity
const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.504.012-4.726.068-2.733.125-3.958 1.353-4.08 4.08-.056 1.222-.067 1.583-.067 4.726s.011 3.504.067 4.726c.122 2.727 1.347 3.956 4.08 4.08 1.222.056 1.585.068 4.726.068s3.504-.012 4.726-.068c2.733-.125 3.958-1.353 4.08-4.08.056-1.222.067-1.583-.067-4.726s-.011-3.504-.067-4.726c-.122-2.727-1.347-3.956-4.08-4.08-1.222-.056-1.585-.068-4.726-.068zm0 5.831a3.171 3.171 0 100 6.342 3.171 3.171 0 000-6.342zm0 8.139a4.968 4.968 0 110-9.936 4.968 4.968 0 010 9.936zM16.949 6.862a1.223 1.223 0 100-2.446 1.223 1.223 0 000 2.446z" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 3.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-2.199 1.564-4.016 3.49-4.016 1.927 0 3.509 1.817 3.509 4.016V24h5v-9.35c0-4.698-2.6-8.65-6.5-8.65-3.003 0-4.505 2.053-4.505 2.053V8z" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

interface FooterProps {
  onMissionClick: () => void;
  onSdgsClick: () => void;
  onAboutClick: () => void;
  onToolClick: () => void;
}

const FooterLink: React.FC<{onClick?: () => void; href?: string; children: React.ReactNode}> = ({ onClick, href, children }) => {
    const commonClasses = "text-gray-400 hover:text-white transition-colors duration-200 text-sm";
    if (onClick) {
        return <button onClick={onClick} className={`${commonClasses} text-left`}>{children}</button>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>{children}</a>;
};

// Wrapper component to ensure icons have dedicated space.
const IconLink: React.FC<{ href: string; ariaLabel: string; children: React.ReactNode }> = ({ href, ariaLabel, children }) => {
  const isMailto = href.startsWith('mailto:');
  const targetProps = isMailto ? {} : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <a 
      href={href} 
      aria-label={ariaLabel} 
      className="block w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      {...targetProps}
    >
      {children}
    </a>
  );
};


const FooterSection: React.FC<FooterProps> = ({ onMissionClick, onSdgsClick, onAboutClick, onToolClick }) => {
  return (
    <footer className="bg-[#050810] text-white pt-16 pb-8 mt-16 sm:mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Brand & Mission */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold tracking-tighter mb-3">{APP_NAME}</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              An advanced AI project innovating for early breast cancer detection, inspiring the world through discovery and accessible technology.
            </p>
          </div>
          
          {/* Middle Column 2: Resources */}
           <div className="md:col-span-3">
            <h4 className="font-semibold text-gray-200 mb-4 tracking-wide">Resources</h4>
            <ul className="space-y-3">
                <li><FooterLink href="https://www.bcrf.org/about-breast-cancer/">In-depth About Breast Cancer</FooterLink></li>
                <li><FooterLink href="https://arxiv.org/abs/1505.04597">U-Net Architecture</FooterLink></li>
                <li><FooterLink href="https://www.sciencedirect.com/science/article/pii/S2352340919312181" >BUSI Dataset</FooterLink></li>
            </ul>
          </div>

          {/* Right Column: Get in Touch */}
          <div className="md:col-span-5">
            <div className="space-y-4">
              {FOUNDERS_DATA.map(founder => {
                const contact = CONTACT_INFO[founder.id as keyof typeof CONTACT_INFO];
                if (!contact) return null;
                return (
                  <div key={founder.id}>
                    <p className="font-medium text-gray-200 text-sm">{founder.name}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <IconLink href={contact.instagram} ariaLabel={`${founder.name} Instagram`}>
                        <InstagramIcon />
                      </IconLink>
                      <IconLink href={contact.linkedin} ariaLabel={`${founder.name} LinkedIn`}>
                        <LinkedInIcon />
                      </IconLink>
                      <IconLink href={`mailto:${contact.email}`} ariaLabel={`Email ${founder.name}`}>
                        <EmailIcon />
                      </IconLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} UEESRG Team. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
                BRAVAWARE is a conceptual project for demonstration purposes. Not for clinical use.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;