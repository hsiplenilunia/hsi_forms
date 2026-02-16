import React from 'react';

export interface LogoItem {
  imgSrc: string;
  imgAlt: string;
  style?: string;
}

export interface SimpleMarqueeProps {
  logos: LogoItem[];
}

const SimpleMarquee: React.FC<SimpleMarqueeProps> = ({ logos }) => {
  //console.log('SimpleMarquee rendered with logos:', logos.length);

  return (
    <div style={{ 
      overflow: 'hidden', 
      width: '100%',
      position: 'relative'
    }}>
      <div 
        className="marquee-track"
        style={{ 
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 20s linear infinite'
        }}
      >
        {/* Primer set */}
        {logos.map((logo, idx) => (
          <div key={`first-${idx}`} style={{ 
            marginRight: '48px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src={logo.imgSrc}
              alt={logo.imgAlt}
              style={{
                height: '64px',
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain'
              }}
              onLoad={() => console.log('Image loaded:', logo.imgAlt)}
              onError={() => console.error('Image error:', logo.imgSrc)}
            />
          </div>
        ))}
        
        {/* Segundo set (duplicado para loop infinito) */}
        {logos.map((logo, idx) => (
          <div key={`second-${idx}`} style={{ 
            marginRight: '48px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src={logo.imgSrc}
              alt={logo.imgAlt}
              style={{
                height: '64px',
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain'
              }}
            />
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-50%); 
          }
        }
        
        .marquee-track {
          will-change: transform;
        }
        
        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 25s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleMarquee;
