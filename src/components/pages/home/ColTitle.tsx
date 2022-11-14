export const ColTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="text-xl font-bold pb-4 border-b border-black/20 dark:border-white/90 ">
      {title}
    </h3>
  );
};
