import React, { useRef, useEffect } from 'react';

export interface LogoItem {
  imgSrc: string;
  imgAlt: string;
  style?: string;
}

export interface MarqueeLogosProps {
  speed?: number; // Pixels per segundo
  direction?: 'left' | 'right';
  logos: LogoItem[];
}

// CSS para la animación de fallback
const fallbackCSS = `
  @keyframes marquee-fallback {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-content {
    animation: marquee-fallback 20s linear infinite;
  }
`;

const MarqueeLogos: React.FC<MarqueeLogosProps> = ({ speed = 50, direction = 'left', logos = [] }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  console.log('MarqueeLogos rendered with:', { logosCount: logos.length, speed, direction });

  useEffect(() => {
    // Agregar CSS de fallback al head
    const style = document.createElement('style');
    style.textContent = fallbackCSS;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    const setupAnimation = () => {
      // Wait for images to load
      const images = content.querySelectorAll('img');
      const promises = Array.from(images).map(img => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise<void>((resolve) => {
          const handleLoad = () => {
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', handleLoad);
            resolve();
          };
          img.addEventListener('load', handleLoad);
          img.addEventListener('error', handleLoad);
        });
      });

      Promise.all(promises).then(() => {
        // Calculate the total width of one set of logos
        const children = content.children;
        if (children.length === 0) return;
        
        let totalWidth = 0;
        const itemsInFirstHalf = children.length / 2;
        
        for (let i = 0; i < itemsInFirstHalf; i++) {
          totalWidth += (children[i] as HTMLElement).offsetWidth;
        }
        
        // Fallback if totalWidth is still 0
        if (totalWidth === 0) {
          totalWidth = itemsInFirstHalf * 200; // Estimated width per logo
        }
        
        // Calculate duration: distance / speed
        const duration = totalWidth / speed;
        
        // Clean up any existing animation
        content.style.animation = 'none';
        content.offsetHeight; // Force reflow
        
        // Create unique keyframe name
        const animationName = `marquee-${direction}-${Date.now()}`;
        
        // Define the movement distance
        const translateDistance = direction === 'left' ? -totalWidth : totalWidth;
        
        // Create and inject CSS keyframes
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
          @keyframes ${animationName} {
            0% { transform: translateX(0); }
            100% { transform: translateX(${translateDistance}px); }
          }
        `;
        document.head.appendChild(styleSheet);
        
        // Apply the animation
        content.style.animation = `${animationName} ${duration}s linear infinite`;
        
        // Cleanup function
        return () => {
          if (document.head.contains(styleSheet)) {
            document.head.removeChild(styleSheet);
          }
        };
      });
    };
    
    // Setup animation after a small delay to ensure DOM is ready
    const timer = setTimeout(setupAnimation, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [speed, direction, logos]);

  return (
    <div
      ref={marqueeRef}
      style={{ 
        overflow: 'hidden', 
        width: '100%', 
        position: 'relative',
        maskImage: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)'
      }}
      aria-label="Patrocinadores logos marquee"
    >
      <div 
        ref={contentRef}
        className="marquee-content"
        style={{ 
          display: 'flex', 
          willChange: 'transform',
          width: 'max-content',
          animation: 'marquee-fallback 20s linear infinite'
        }}
      >
        {/* First set of logos */}
        {logos.map((logo, idx) => (
          <div key={`first-${idx}`} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginRight: 48,
            flexShrink: 0
          }}>
            <img
              src={logo.imgSrc}
              alt={logo.imgAlt}
              className={logo.style || ''}
              style={{
                maxHeight: 64,
                width: 'auto',
                maxWidth: 160,
                minWidth: 60,
                objectFit: 'contain',
                display: 'block',
              }}
              loading="lazy"
              onLoad={() => console.log('Image loaded:', logo.imgAlt)}
              onError={() => console.error('Image failed to load:', logo.imgSrc)}
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, idx) => (
          <div key={`second-${idx}`} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginRight: 48,
            flexShrink: 0
          }}>
            <img
              src={logo.imgSrc}
              alt={logo.imgAlt}
              className={logo.style || ''}
              style={{
                maxHeight: 64,
                width: 'auto',
                maxWidth: 160,
                minWidth: 60,
                objectFit: 'contain',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeLogos;
