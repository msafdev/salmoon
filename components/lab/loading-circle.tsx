const LoadingCircle = () => {
  return (
    <div className="flex aspect-square w-12 items-center justify-center rounded-full bg-gradient-to-b from-transparent via-transparent to-primary p-0.5 animate-spin">
      <div className="h-full w-full animate-spin rounded-full bg-background" />
    </div>
  );
};

export default LoadingCircle;
