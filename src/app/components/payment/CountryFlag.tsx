// app/dashboard/payment/components/CountryFlag.tsx
import React from 'react';

interface CountryFlagProps {
  country: 'nigeria' | 'ghana' | 'kenya' | 'south-africa' | 'egypt' | 'morocco' | 'ethiopia' | 'tanzania' | 'uganda' | 'rwanda' | 'senegal' | 'ivory-coast' | 'cameroon' | 'zambia' | 'zimbabwe' | 'usa' | 'uk' | 'canada' | 'france' | 'germany' | 'japan' | 'china' | 'india' | 'brazil' | 'australia';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CountryFlag({ country, size = 'md', className = '' }: CountryFlagProps) {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-6'
  };

  const flagComponents: Record<string, React.ReactNode> = {
    nigeria: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="300" height="600" fill="#008751"/>
        <rect x="300" width="300" height="600" fill="#ffffff"/>
        <rect x="600" width="300" height="600" fill="#008751"/>
      </svg>
    ),
    
    ghana: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="200" fill="#ce1126"/>
        <rect y="200" width="900" height="200" fill="#fcd116"/>
        <rect y="400" width="900" height="200" fill="#006b3f"/>
        <polygon points="450,220 462,256 500,256 470,278 482,314 450,292 418,314 430,278 400,256 438,256" fill="#000000"/>
      </svg>
    ),

    kenya: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="120" fill="#000000"/>
        <rect y="120" width="900" height="120" fill="#ffffff"/>
        <rect y="240" width="900" height="120" fill="#ce1126"/>
        <rect y="360" width="900" height="120" fill="#ffffff"/>
        <rect y="480" width="900" height="120" fill="#007a33"/>
        <ellipse cx="450" cy="300" rx="90" ry="60" fill="#ffffff"/>
        <ellipse cx="450" cy="300" rx="80" ry="50" fill="#ce1126"/>
        <ellipse cx="450" cy="300" rx="70" ry="40" fill="#000000"/>
        <ellipse cx="450" cy="300" rx="60" ry="30" fill="#ffffff"/>
        <rect x="420" y="240" width="60" height="120" fill="#8b4513"/>
        <polygon points="450,240 465,225 435,225" fill="#228b22"/>
        <polygon points="450,360 465,375 435,375" fill="#228b22"/>
      </svg>
    ),

    'south-africa': (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#ffffff"/>
        <rect width="900" height="100" fill="#e03c31"/>
        <rect y="500" width="900" height="100" fill="#001489"/>
        <polygon points="0,0 0,600 400,300" fill="#007749"/>
        <polygon points="0,0 0,600 350,300" fill="#000000"/>
        <polygon points="0,0 0,600 300,300" fill="#ffb612"/>
        <rect y="100" width="900" height="50" fill="#ffffff"/>
        <rect y="450" width="900" height="50" fill="#ffffff"/>
      </svg>
    ),

    egypt: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="200" fill="#ce1126"/>
        <rect y="200" width="900" height="200" fill="#ffffff"/>
        <rect y="400" width="900" height="200" fill="#000000"/>
        <g transform="translate(450,300)">
          <circle r="60" fill="#ffd700"/>
          <polygon points="0,-40 12,-12 40,-12 20,8 32,36 0,16 -32,36 -20,8 -40,-12 -12,-12" fill="#000000"/>
        </g>
      </svg>
    ),

    morocco: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#c1272d"/>
        <g transform="translate(450,300)">
          <polygon points="0,-80 24,-24 80,-24 32,16 56,72 0,32 -56,72 -32,16 -80,-24 -24,-24" fill="#006233" stroke="#006233" strokeWidth="3"/>
        </g>
      </svg>
    ),

    ethiopia: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="200" fill="#078930"/>
        <rect y="200" width="900" height="200" fill="#fcdd09"/>
        <rect y="400" width="900" height="200" fill="#da020e"/>
        <circle cx="450" cy="300" r="80" fill="#0f47af"/>
        <polygon points="450,240 465,285 510,285 475,315 490,360 450,330 410,360 425,315 390,285 435,285" fill="#fcdd09"/>
      </svg>
    ),

    tanzania: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#1eb53a"/>
        <polygon points="0,0 900,600 900,540 60,0" fill="#00a3dd"/>
        <polygon points="0,0 900,600 900,480 180,0" fill="#000000"/>
        <polygon points="0,0 900,600 900,420 300,0" fill="#fcd116"/>
        <polygon points="0,60 840,600 900,600 900,0" fill="#000000"/>
        <polygon points="0,120 780,600 900,600 900,0" fill="#fcd116"/>
      </svg>
    ),

    uganda: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="100" fill="#000000"/>
        <rect y="100" width="900" height="100" fill="#fcdd09"/>
        <rect y="200" width="900" height="100" fill="#da020e"/>
        <rect y="300" width="900" height="100" fill="#000000"/>
        <rect y="400" width="900" height="100" fill="#fcdd09"/>
        <rect y="500" width="900" height="100" fill="#da020e"/>
        <circle cx="450" cy="300" r="80" fill="#ffffff"/>
        <g transform="translate(450,300)" fill="#000000">
          <ellipse cx="0" cy="-20" rx="30" ry="15"/>
          <ellipse cx="-15" cy="10" rx="10" ry="25"/>
          <ellipse cx="15" cy="10" rx="10" ry="25"/>
          <ellipse cx="0" cy="40" rx="20" ry="10"/>
        </g>
      </svg>
    ),

    rwanda: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="200" fill="#00a1de"/>
        <rect y="200" width="900" height="200" fill="#fad201"/>
        <rect y="400" width="900" height="200" fill="#1c8b3c"/>
        <g transform="translate(750,150)">
          <circle r="40" fill="#fad201"/>
          <g fill="#00a1de">
            <rect x="-30" y="-5" width="60" height="10"/>
            <rect x="-5" y="-30" width="10" height="60"/>
            <rect x="-21" y="-21" width="42" height="8" transform="rotate(45)"/>
            <rect x="-21" y="-21" width="42" height="8" transform="rotate(-45)"/>
          </g>
        </g>
      </svg>
    ),

    senegal: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="300" height="600" fill="#00853f"/>
        <rect x="300" width="300" height="600" fill="#fdef42"/>
        <rect x="600" width="300" height="600" fill="#e31b23"/>
        <polygon points="450,200 470,260 530,260 485,300 505,360 450,320 395,360 415,300 370,260 430,260" fill="#00853f"/>
      </svg>
    ),

    'ivory-coast': (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="300" height="600" fill="#f77f00"/>
        <rect x="300" width="300" height="600" fill="#ffffff"/>
        <rect x="600" width="300" height="600" fill="#009639"/>
      </svg>
    ),

    cameroon: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="300" height="600" fill="#007a5e"/>
        <rect x="300" width="300" height="600" fill="#ce1126"/>
        <rect x="600" width="300" height="600" fill="#fcd116"/>
        <polygon points="450,200 470,260 530,260 485,300 505,360 450,320 395,360 415,300 370,260 430,260" fill="#fcd116"/>
      </svg>
    ),

    zambia: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#198a00"/>
        <rect x="450" width="450" height="300" fill="#de2010"/>
        <rect x="450" y="300" width="450" height="150" fill="#000000"/>
        <rect x="450" y="450" width="450" height="150" fill="#ef7d00"/>
        <g transform="translate(675,150)">
          <rect x="-30" y="-20" width="60" height="40" fill="#8b4513"/>
          <rect x="-25" y="-15" width="50" height="30" fill="#ffd700"/>
          <rect x="-20" y="-10" width="40" height="20" fill="#000000"/>
        </g>
      </svg>
    ),

    zimbabwe: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="85" fill="#078930"/>
        <rect y="85" width="900" height="85" fill="#fcdd09"/>
        <rect y="170" width="900" height="85" fill="#da020e"/>
        <rect y="255" width="900" height="85" fill="#000000"/>
        <rect y="340" width="900" height="85" fill="#da020e"/>
        <rect y="425" width="900" height="85" fill="#fcdd09"/>
        <rect y="510" width="900" height="90" fill="#078930"/>
        <polygon points="0,0 0,600 300,300" fill="#ffffff"/>
        <polygon points="50,250 100,200 150,250 100,300" fill="#da020e"/>
        <g transform="translate(100,220)">
          <rect x="-20" y="-10" width="40" height="20" fill="#fcdd09"/>
          <polygon points="0,-15 -15,0 0,15 15,0" fill="#000000"/>
        </g>
      </svg>
    ),

    usa: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#b22234"/>
        <rect y="46" width="900" height="46" fill="#ffffff"/>
        <rect y="138" width="900" height="46" fill="#b22234"/>
        <rect y="230" width="900" height="46" fill="#ffffff"/>
        <rect y="322" width="900" height="46" fill="#b22234"/>
        <rect y="414" width="900" height="46" fill="#ffffff"/>
        <rect y="506" width="900" height="46" fill="#b22234"/>
        <rect width="360" height="315" fill="#3c3b6e"/>
        <g fill="#ffffff">
          {Array.from({length: 50}, (_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            const isOddRow = row % 2 === 1;
            const x = isOddRow ? 36 + col * 36 : 18 + col * 36;
            const y = 18 + row * 27;
            return <circle key={i} cx={x} cy={y} r="8"/>;
          })}
        </g>
      </svg>
    ),

    uk: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#012169"/>
        <g stroke="#ffffff" strokeWidth="100">
          <path d="M0,0 L900,600 M900,0 L0,600"/>
        </g>
        <g stroke="#c8102e" strokeWidth="60">
          <path d="M0,0 L900,600 M900,0 L0,600"/>
        </g>
        <g stroke="#ffffff" strokeWidth="180">
          <path d="M450,0 L450,600 M0,300 L900,300"/>
        </g>
        <g stroke="#c8102e" strokeWidth="120">
          <path d="M450,0 L450,600 M0,300 L900,300"/>
        </g>
      </svg>
    ),

    canada: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="225" height="600" fill="#ff0000"/>
        <rect x="225" width="450" height="600" fill="#ffffff"/>
        <rect x="675" width="225" height="600" fill="#ff0000"/>
        <g transform="translate(450,300)" fill="#ff0000">
          <polygon points="0,-80 20,-40 60,-50 30,-10 50,20 0,10 -50,20 -30,-10 -60,-50 -20,-40"/>
          <rect x="-10" y="-100" width="20" height="40"/>
        </g>
      </svg>
    ),

    france: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="300" height="600" fill="#002654"/>
        <rect x="300" width="300" height="600" fill="#ffffff"/>
        <rect x="600" width="300" height="600" fill="#ed2939"/>
      </svg>
    ),

    germany: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="200" fill="#000000"/>
        <rect y="200" width="900" height="200" fill="#dd0000"/>
        <rect y="400" width="900" height="200" fill="#ffce00"/>
      </svg>
    ),

    japan: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#ffffff"/>
        <circle cx="450" cy="300" r="120" fill="#bc002d"/>
      </svg>
    ),

    china: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#de2910"/>
        <g fill="#ffde00">
          <polygon points="150,120 170,180 230,180 185,215 205,275 150,240 95,275 115,215 70,180 130,180"/>
          <polygon points="300,90 305,105 320,105 310,115 315,130 300,120 285,130 290,115 280,105 295,105"/>
          <polygon points="320,150 325,165 340,165 330,175 335,190 320,180 305,190 310,175 300,165 315,165"/>
          <polygon points="320,210 325,225 340,225 330,235 335,250 320,240 305,250 310,235 300,225 315,225"/>
          <polygon points="280,270 285,285 300,285 290,295 295,310 280,300 265,310 270,295 260,285 275,285"/>
        </g>
      </svg>
    ),

    india: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="200" fill="#ff9933"/>
        <rect y="200" width="900" height="200" fill="#ffffff"/>
        <rect y="400" width="900" height="200" fill="#138808"/>
        <circle cx="450" cy="300" r="80" fill="#000080" fillOpacity="0.8"/>
        <g transform="translate(450,300)" fill="#000080">
          {Array.from({length: 24}, (_, i) => (
            <line key={i} x1="0" y1="-60" x2="0" y2="-75" stroke="#000080" strokeWidth="2" transform={`rotate(${i * 15})`}/>
          ))}
        </g>
      </svg>
    ),

    brazil: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#009639"/>
        <polygon points="450,50 800,300 450,550 100,300" fill="#fedf00"/>
        <circle cx="450" cy="300" r="120" fill="#002776"/>
        <path d="M380,320 Q450,280 520,320" stroke="#ffffff" strokeWidth="4" fill="none"/>
        <text x="450" y="340" textAnchor="middle" fill="#ffffff" fontSize="24" fontFamily="Arial">ORDEM</text>
      </svg>
    ),

    australia: (
      <svg viewBox="0 0 900 600" className={`${sizeClasses[size]} ${className}`}>
        <rect width="900" height="600" fill="#012169"/>
        <rect width="450" height="300" fill="#012169"/>
        <g stroke="#ffffff" strokeWidth="50">
          <path d="M0,0 L450,300 M450,0 L0,300"/>
        </g>
        <g stroke="#c8102e" strokeWidth="30">
          <path d="M0,0 L450,300 M450,0 L0,300"/>
        </g>
        <g stroke="#ffffff" strokeWidth="90">
          <path d="M225,0 L225,300 M0,150 L450,150"/>
        </g>
        <g stroke="#c8102e" strokeWidth="60">
          <path d="M225,0 L225,300 M0,150 L450,150"/>
        </g>
        <g fill="#ffffff">
          <polygon points="680,120 690,150 720,150 698,168 708,198 680,180 652,198 662,168 640,150 670,150"/>
          <polygon points="750,200 755,220 775,220 763,232 768,252 750,240 732,252 737,232 725,220 745,220"/>
          <polygon points="650,250 655,270 675,270 663,282 668,302 650,290 632,302 637,282 625,270 645,270"/>
          <polygon points="580,300 585,320 605,320 593,332 598,352 580,340 562,352 567,332 555,320 575,320"/>
          <polygon points="520,250 525,270 545,270 533,282 538,302 520,290 502,302 507,282 495,270 515,270"/>
          <polygon points="720,350 725,370 745,370 733,382 738,402 720,390 702,402 707,382 695,370 715,370"/>
        </g>
      </svg>
    )
  };

  const flagElement = flagComponents[country];
  
  if (!flagElement) {
    console.warn(`Flag for country "${country}" not found`);
    return <span className={`${sizeClasses[size]} ${className} bg-gray-200 rounded`} />;
  }

  return flagElement;
}