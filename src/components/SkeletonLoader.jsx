export default function SkeletonLoader({ variant = 'card', width = '100%', height = 120 }) {
  const baseStyle = {
    width,
    height: variant === 'text' ? 16 : variant === 'chart' ? 300 : height,
    borderRadius: variant === 'text' ? 4 : 12,
    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
  }
  return <div style={baseStyle} />
}