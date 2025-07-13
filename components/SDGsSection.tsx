import React from 'react';

interface SdgInfo {
  id: string;
  number: number;
  title: string;
  description: string;
  color: string; // Tailwind bg color class
  iconPath: string; // Placeholder for local asset path
}

const sdgData: SdgInfo[] = [
  {
    id: 'sdg-3',
    number: 3,
    title: 'Good Health and Well-being',
    description: 'By providing an accessible tool for early breast cancer detection, we directly contribute to reducing premature mortality from non-communicable diseases.',
    color: 'bg-[#279946]',
    iconPath: '/E_PRINT_03.jpg'
  },
  {
    id: 'sdg-5',
    number: 5,
    title: 'Gender Equality',
    description: 'This project focuses on a health issue that disproportionately affects women, contributing to their health, well-being, and empowerment.',
    color: 'bg-[#E74531]',
    iconPath: '/E_PRINT_05.jpg'
  },
  {
    id: 'sdg-9',
    number: 9,
    title: 'Industry, Innovation, and Infrastructure',
    description: 'We leverage and implement the deep learning (U-Net) as technological solution to a real-world health challenge.',
    color: 'bg-[#F16D22]',
    iconPath: '/E_PRINT_09.jpg'
  },
  {
    id: 'sdg-10',
    number: 10,
    title: 'Reduced Inequalities',
    description: 'Our web-based tool aims to reduce inequalities in healthcare access by providing a low-cost, scalable method for preliminary screening.',
    color: 'bg-[#DC2F7B]',
    iconPath: '/E_PRINT_10.jpg'
  },
];

const SDGCard: React.FC<{ info: SdgInfo }> = ({ info }) => {
  return (
    <div className={`
      ${info.color} 
      rounded-xl 
      p-6 
      text-white 
      flex 
      flex-col 
      shadow-lg 
      hover:shadow-2xl 
      transform 
      hover:-translate-y-2 
      transition-all 
      duration-300
      w-full
      max-w-sm
      sm:w-64
      lg:w-72
    `}>
      <img 
        src={info.iconPath} 
        alt={`SDG ${info.number} Icon`} 
        className="w-16 h-16 mb-4 object-contain"
      />
      <h3 className="text-xl font-bold leading-tight">
        Goal {info.number}: {info.title}
      </h3>
      <p className="mt-3 text-sm font-light flex-grow">
        {info.description}
      </p>
    </div>
  );
};


const SDGsSection: React.FC = () => {
  return (
    <section id="sdgs" className="py-12">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-violet-300">
        Our Contribution to SDGs
      </h2>
      <div className="flex flex-wrap justify-center items-stretch gap-6 lg:gap-8">
        {sdgData.map((sdg) => (
          <SDGCard key={sdg.id} info={sdg} />
        ))}
      </div>
    </section>
  );
};

export default SDGsSection;