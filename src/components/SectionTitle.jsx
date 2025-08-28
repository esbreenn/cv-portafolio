export default function SectionTitle(props) {
  const { icon: Icon, children } = props;
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <h2 className="text-sm tracking-wide font-semibold uppercase opacity-80">{children}</h2>
    </div>
  );
}
