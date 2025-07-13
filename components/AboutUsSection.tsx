import React from 'react';
import { FOUNDERS_DATA } from '../constants';
import { Founder } from '../types';
import GlassCard from './common/GlassCard';

const FounderCard: React.FC<{ founder: Founder }> = ({ founder }) => (
  <GlassCard className="h-full flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
    <img 
      src={founder.imageUrl} 
      alt={founder.name} 
      className="w-36 h-36 rounded-full mb-6 object-cover border-4 border-white/30 shadow-lg"
    />
    <h3 className="text-2xl font-semibold text-white">{founder.name}</h3>
    <p className="text-md text-[#e18aaa] font-medium mt-1">{founder.role}</p> {/* Clinical Pink for role */}
    <p className="text-sm text-gray-400 mt-3 flex-grow">{founder.description}</p>
  </GlassCard>
);

const AboutUsSection: React.FC = () => {
  return (
    <section id="about-us" className="py-12">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-violet-300">
        A Word From Our Founder
      </h2>

      {/* Founder's Quote Section */}
      <figure className="max-w-4xl mx-auto mb-16 text-center">
        <blockquote className="text-xl sm:text-2xl italic text-gray-300 leading-relaxed relative px-6">
          <span className="absolute top-0 left-0 text-8xl text-[#7a5af7]/20 -translate-x-4 -translate-y-6 font-sans font-bold opacity-50 select-none" aria-hidden="true">“</span>
            In BRAVAWARE, we believe that even the most complex line of code must lead to one simple goal: humanity. We build technology not to replace, but to empower hope.
          <span className="absolute bottom-0 right-0 text-8xl text-[#7a5af7]/20 translate-x-4 translate-y-8 font-sans font-bold opacity-50 select-none" aria-hidden="true">”</span>
        </blockquote>
        <figcaption className="mt-8">
          <p className="text-lg font-medium text-white">I Gede Bagus Jayendra</p>
          <p className="text-md text-[#e18aaa]">Founder & Lead AI Developer</p>
        </figcaption>
      </figure>

      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-violet-300">
        Meet The Team
      </h2>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {FOUNDERS_DATA.map((founder) => (
          <FounderCard key={founder.id} founder={founder} />
        ))}
      </div>
    </section>
  );
};

export default AboutUsSection;