type LogoImageProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function LogoImage({ width = 36, height = 36, className }: LogoImageProps) {
  return (
    <img
      src="/logo.png"
      alt="United Sports"
      width={width}
      height={height}
      className={className}
    />
  );
}
