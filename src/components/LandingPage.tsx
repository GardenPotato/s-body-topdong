import React, { CSSProperties } from 'react';
import { useContent, TextStyle } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Dumbbell, UserCheck, MapPin, ChevronRight, Phone, Instagram, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

// Helper to get icon component
const getIcon = (name: string) => {
  switch (name) {
    case 'Dumbbell': return <Dumbbell className="w-6 h-6" />;
    case 'UserCheck': return <UserCheck className="w-6 h-6" />;
    case 'MapPin': return <MapPin className="w-6 h-6" />;
    default: return <Dumbbell className="w-6 h-6" />;
  }
};

// Helper to convert TextStyle to CSSProperties
const getTextStyle = (style: TextStyle): CSSProperties => ({
  fontSize: getFontSize(style.fontSize),
  color: style.color,
  fontWeight: getFontWeight(style.fontWeight),
  textAlign: style.textAlign,
  whiteSpace: 'pre-wrap', // Support line breaks everywhere
});

const getFontWeight = (weight: string) => {
  switch (weight) {
    case 'normal': return 400;
    case 'medium': return 500;
    case 'bold': return 700;
    case 'extrabold': return 800;
    case 'black': return 900;
    default: return 400;
  }
};

const getFontSize = (size: string) => {
  switch (size) {
    case 'xs': return '0.75rem';
    case 'sm': return '0.875rem';
    case 'base': return '1rem';
    case 'lg': return '1.125rem';
    case 'xl': return '1.25rem';
    case '2xl': return '1.5rem';
    case '3xl': return '1.875rem';
    case '4xl': return '2.25rem';
    default: return '1rem';
  }
};

export const LandingPage = () => {
  const { content } = useContent();
  const { theme } = content;

  return (
    <div 
      className="w-full max-w-[480px] mx-auto min-h-screen bg-white shadow-2xl overflow-hidden font-sans"
      style={{ fontFamily: theme.fontFamily }}
    >
      {/* 1. Hero Section */}
      <section className="relative aspect-[9/16] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={content.hero.bgImage} 
            alt="Gym Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 uppercase tracking-wider" style={getTextStyle(content.hero.styles.subCopy)}>
              {content.hero.subCopy}
            </p>
            <h1 className="mb-4 leading-tight" style={getTextStyle(content.hero.styles.mainCopy)}>
              {content.hero.mainCopy}
            </h1>
            <p className="mb-8" style={getTextStyle(content.hero.styles.brandName)}>
              {content.hero.brandName}
            </p>
            
            <div className="flex flex-col items-center w-full">
              <span className="text-xs font-bold mb-2 animate-bounce" style={{ color: theme.accentColor }}>
                {content.hero.ctaSubText}
              </span>
              <a 
                href={content.hero.ctaLink}
                className="w-full py-4 rounded-xl font-bold text-lg text-white text-center shadow-lg transition-transform active:scale-95"
                style={{ backgroundColor: theme.accentColor }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_click', {
                      'cta_location': 'top'
                    });
                  }
                }}
              >
                {content.hero.ctaText}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. USP Summary (Full width bg + overlay + cards) */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src={content.uspSummary.bgImage} 
            alt="USP Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
        
        <div className="relative z-10 mb-10 text-center space-y-2">
          {content.uspSummary.headCopy && (
            <h2 style={getTextStyle(content.uspSummary.styles.headCopy || content.uspSummary.styles.title)}>
              {content.uspSummary.headCopy}
            </h2>
          )}
          {content.uspSummary.bodyCopy && (
            <p style={getTextStyle(content.uspSummary.styles.bodyCopy || content.uspSummary.styles.description)}>
              {content.uspSummary.bodyCopy}
            </p>
          )}
        </div>
        
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {content.uspSummary.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm h-full"
            >
              <div className="p-2.5 rounded-full mb-3 text-white shadow-md" style={{ backgroundColor: theme.accentColor }}>
                {getIcon(item.icon)}
              </div>
              <h3 className="mb-1 leading-tight" style={getTextStyle(content.uspSummary.styles.title)}>{item.title}</h3>
              <p className="leading-snug break-keep" style={getTextStyle(content.uspSummary.styles.description)}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Convention (Image between Title and Description) */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <h2 className="mb-6" style={getTextStyle(content.convention.styles.title)}>
            {content.convention.title}
          </h2>
          
          <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
            <img 
              src={content.convention.image} 
              alt="Convention" 
              className="w-full h-full object-cover"
            />
          </div>

          <p className="mb-12 leading-relaxed" style={getTextStyle(content.convention.styles.description)}>
            {content.convention.description}
          </p>
          
          <div className="w-16 h-1 mx-auto mb-12" style={{ backgroundColor: theme.accentColor }} />
          
          <h3 className="leading-snug" style={getTextStyle(content.convention.styles.mainCopy)}>
            {content.convention.mainCopy}
          </h3>
        </motion.div>
      </section>

      {/* 4. Disruption (Full width bg + overlay + text) */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={content.disruption.bgImage} 
            alt="Disruption Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="mb-4 uppercase tracking-widest" style={getTextStyle(content.disruption.styles.title)}>
            {content.disruption.title}
          </h2>
          <p className="mb-8 leading-relaxed" style={getTextStyle(content.disruption.styles.description)}>
            {content.disruption.description}
          </p>
          <h3 className="leading-tight" style={getTextStyle(content.disruption.styles.mainCopy)}>
            {content.disruption.mainCopy}
          </h3>
        </motion.div>
      </section>

      {/* 5. Detailed USPs (Mixed Sections) */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="px-6 mb-12 text-center space-y-2">
          {content.detailedUsps.headCopy && (
            <h2 style={getTextStyle(content.detailedUsps.styles.headCopy || content.detailedUsps.styles.title)}>
              {content.detailedUsps.headCopy}
            </h2>
          )}
          {content.detailedUsps.bodyCopy && (
            <p style={getTextStyle(content.detailedUsps.styles.bodyCopy || content.detailedUsps.styles.description)}>
              {content.detailedUsps.bodyCopy}
            </p>
          )}
        </div>
        <div className="px-6 space-y-12">
           {content.detailedUsps.sections.map((section, idx) => (
             <div key={section.id}>
               {section.type === 'card' ? (
                 // Card Type
                 <motion.div 
                   className="bg-white rounded-2xl overflow-hidden shadow-md"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4 }}
                 >
                   {section.image && (
                     <div className="h-48 overflow-hidden">
                       <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                     </div>
                   )}
                   <div className="p-6">
                     <div className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: theme.accentColor }}>
                       POINT {idx + 1}
                     </div>
                     <h3 className="mb-3 whitespace-pre-wrap" style={getTextStyle(content.detailedUsps.styles.title)}>{section.title}</h3>
                     <p className="leading-relaxed" style={getTextStyle(content.detailedUsps.styles.description)}>{section.description}</p>
                   </div>
                 </motion.div>
               ) : (
                 // Carousel Type
                 <div className="space-y-4">
                   <div className="px-1">
                      <div className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: theme.accentColor }}>
                       POINT {idx + 1}
                     </div>
                     <h3 className="mb-2 whitespace-pre-wrap" style={getTextStyle(content.detailedUsps.styles.title)}>{section.title}</h3>
                     <p className="leading-relaxed mb-4" style={getTextStyle(content.detailedUsps.styles.description)}>{section.description}</p>
                   </div>
                   
                   <div className="flex overflow-x-auto overflow-y-hidden pb-4 space-x-4 no-scrollbar snap-x snap-mandatory -mx-6 px-6">
                     {section.items?.map((item, itemIdx) => (
                       <motion.div 
                         key={itemIdx}
                         className="flex-shrink-0 w-[85%] snap-center bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: itemIdx * 0.1 }}
                       >
                         <div className="aspect-[3/4] overflow-hidden bg-gray-200">
                           <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
                         </div>
                         <div className="p-4 text-center">
                           <p className="text-lg font-bold text-gray-900 mb-1">{item.text}</p>
                           {item.description && (
                             <p className="text-sm text-gray-500 whitespace-pre-wrap">{item.description}</p>
                           )}
                         </div>
                       </motion.div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           ))}
        </div>
      </section>

      {/* Notices Section */}
      {content.notices.show && (
        <section className="py-12 px-6 bg-white border-t border-gray-100">
          <h3 className="text-lg font-bold mb-1 text-gray-900">{content.notices.title}</h3>
          {content.notices.description && (
            <p className="text-sm text-gray-500 mb-6">{content.notices.description}</p>
          )}
          <div className="space-y-4">
            {content.notices.items.map((item, idx) => (
              <div 
                key={idx} 
                className="block p-4 rounded-xl bg-gray-50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-500">{item.date}</span>
                </div>
                <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Outro */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8 border-2" style={{ borderColor: theme.accentColor }}>
          <img 
            src={content.outro.mapImage} 
            alt="Map" 
            className="w-full aspect-square object-cover"
          />
        </div>
        <a 
          href={content.outro.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: theme.accentColor }}
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'cta_click', {
                'cta_location': 'bottom'
              });
            }
          }}
        >
          {content.outro.ctaText}
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-sm">
        <div className="mb-8">
          <h4 className="text-white font-bold text-lg mb-4">{content.footer.brandName}</h4>
          <p className="mb-2">{content.footer.address}</p>
          <p className="mb-2">{content.footer.hours}</p>
          <a href={`tel:${content.footer.phone}`} className="flex items-center gap-2 mt-4 text-white font-bold">
            <Phone size={16} /> {content.footer.phone}
          </a>
        </div>
        
        <div className="flex gap-4 pt-8 border-t border-gray-800">
          <a href={content.footer.instagram} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <Instagram size={20} />
          </a>
          <a href={content.footer.blog} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <Globe size={20} />
          </a>
        </div>
        <p className="mt-8 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} {content.footer.brandName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
