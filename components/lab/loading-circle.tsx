const LoadingCircle = ({ size = 48 }: { size?: number }) => {
  return (
    <div
      className="flex aspect-square animate-spin items-center justify-center rounded-full bg-gradient-to-b from-transparent via-transparent to-primary p-0.5"
      style={{ width: `${size}px` }}
    >
      <div className="h-full w-full animate-spin rounded-full bg-background" />
    </div>
  );
};

export default LoadingCircle;
