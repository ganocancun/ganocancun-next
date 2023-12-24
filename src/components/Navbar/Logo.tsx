// Logo.tsx
import Image from 'next/image';

// Static imports for the logo images
import logoLight from  '@/assets/images/logo.png';
import logoDark from  '@/assets/images/logo-dark.png';

const Logo: React.FC = () => {
  return (
    <picture>
      {/* Use dark mode logo when the preference is set to dark */}
      <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
      {/* Default light mode logo */}
      <Image src={logoLight} alt="Logo" width={50} height={50} priority />
    </picture>
  );
};

export default Logo;