// import Image from "next/image";

// export default function Logo(){
//     return (
//         <div className="flex items-center justify-center">
//             <Image
//                 src="/logo.png"
//                 alt="JeanPay Logo"
//                 className="dark:invert"
//                 width={180}
//                 height={38}
//             />
//         </div>
//     );
// }


import Image from "next/image";

type LogoProps = {
  variant?: "primary" | "secondary" ;
  width?: number;
  height?: number;
  className?: string;
};

const logoVariants = {
  primary: "/logo.png",
  secondary: "/logoIcon.png",
};

export default function Logo({ 
  variant = "primary", 
  width = 180, 
  height = 38, 
  className = "" 
}: LogoProps) {
  const logoSource = logoVariants[variant];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={logoSource}
        alt="JeanPay Logo"
        className="dark:invert"
        width={width}
        height={height}
        priority
      />
    </div>
  );
}