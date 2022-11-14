export const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 xl:gap-14 gap-3">
      {children}
    </div>
  );
};
