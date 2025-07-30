type StatCardProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  color?: string;
};

export default function StatCard(props: StatCardProps) {
  return (
    <>
      <div
        className="flex items-center justify-between px-11 py-7 gap-6 rounded-xl text-background"
        style={{ backgroundColor: props.color ?? "pink" }}
      >
        <div>{props.icon}</div>
        <div className="flex flex-col items-end justify-between">
          <span className="font-base">{props.label}</span>
          <span className="text-4xl font-bold">{props.value}</span>
        </div>
      </div>
    </>
  );
}
