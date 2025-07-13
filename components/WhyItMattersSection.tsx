
import React from 'react';
import GlassCard from './common/GlassCard';

// Self-contained SVG icons, styled to match the theme
const QuestionIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#7a5af7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartbeatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#7a5af7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const MicroChipIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#7a5af7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M19.5 8.25H21M15.75 21v-1.5M4.5 15.75H3m18 0h-1.5M12 5.25v13.5m-3.75-13.5H12m0 13.5h-3.75M12 5.25H8.25M12 18.75h3.75m0-13.5H12m0 13.5h3.75M12 5.25h3.75" />
        <rect x="6" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
);


const DnaIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#7a5af7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => {
  return (
    <GlassCard className="h-full flex flex-col p-6 transition-all duration-300 hover:border-[#e18aaa] hover:shadow-[0_0_25px_rgba(225,138,170,0.5)]">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 bg-[rgba(25,30,50,0.7)] rounded-lg p-3 mr-5">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white leading-tight pt-1">{title}</h3>
      </div>
      <div className="text-gray-300 text-base leading-relaxed space-y-2">
        {children}
      </div>
    </GlassCard>
  );
};


const WhyItMattersSection: React.FC = () => {
  return (
    <section id="why-it-matters" className="py-12">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-violet-300">
        The Importance of Early Detection
      </h2>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
        <InfoCard icon={<QuestionIcon />} title="What is Breast Cancer?">
          <p>
            Breast cancer is a disease where cells in the breast grow out of control. There are different kinds of breast cancer, depending on which cells in the breast turn into cancer. It can begin in different parts of the breast and can spread outside the breast through blood vessels and lymph vessels. Early detection is key to effective treatment and survival.
          </p>
        </InfoCard>

        <InfoCard icon={<HeartbeatIcon />} title="Why This Research is Crucial">
          <p>
            Breast cancer is one of the most common cancers affecting people worldwide. When detected early, and if adequate diagnosis and treatment are available, there is a good chance that breast cancer can be cured. Our mission with BRAVAWARE is to provide an accessible tool that leverages AI to assist in the early identification of potential abnormalities, aiming to improve patient outcomes.
          </p>
        </InfoCard>

        <InfoCard icon={<MicroChipIcon />} title="How We Detect Abnormalities">
           <p>
            Our system utilizes a powerful deep learning model called <strong className="font-semibold text-white">U-Net</strong>, renowned for biomedical image segmentation. Trained using PyTorch on the public <span className="font-semibold text-[#e18aaa]">Breast Ultrasound Images Dataset (BUSI)</span>, our model performs two tasks from a single ultrasound (USG) image:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1 text-gray-400">
             <li><strong className="text-gray-300">Classification:</strong> Identifying if a tumor is present and its type.</li>
             <li><strong className="text-gray-300">Segmentation:</strong> Precisely outlining the area of concern.</li>
          </ul>
        </InfoCard>
        
        <InfoCard icon={<DnaIcon />} title="Types of Tumors">
          <p>
            Our model helps distinguish between the two main types of breast tumors identified in the USG images:
          </p>
           <ul className="list-disc list-inside pl-2 space-y-1 text-gray-400">
             <li><strong className="text-green-400">Benign:</strong> These are non-cancerous growths. They tend to grow slowly and do not spread to other parts of the body.</li>
             <li><strong className="text-red-400">Malignant:</strong> These tumors are cancerous. The cells can grow, invade surrounding tissue, and spread (metastasize).</li>
          </ul>
           <p className="pt-2">Early and accurate classification is vital for determining the correct treatment path.</p>
        </InfoCard>
      </div>
    </section>
  );
};

export default WhyItMattersSection;
