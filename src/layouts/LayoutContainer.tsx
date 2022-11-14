type Props = { children: React.ReactNode };

export const LayoutContainer = ({ children }: Props) => {
  return <div className="px-4 lg:px-10 xl:px-14">{children}</div>;
};
