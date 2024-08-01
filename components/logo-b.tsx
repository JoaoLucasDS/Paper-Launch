interface LogoProps {
  size: string;
}


const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <svg width={size} viewBox="70 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M84 102.743L354 0L321.5 282.5L181.453 288L154.506 240.949L101.177 219.987L84 102.743Z" fill="#F58634"/>
        <path d="M102 219.987L354 0L182.014 288L155.156 240.949L102 219.987Z" fill="#F16436"/>
    </svg>
  );
};

export default Logo;
