type input = {
  type: "text" | "email" | "password" | "number" | "date";
  hideLabel?: boolean;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  suffix?: React.ReactNode;
};

export default function Input(props: input) {
  return (
    <div className={`space-y-1 flex flex-col flex-1 text-foreground`}>
      <label hidden={props.hideLabel} className={`capitalize`}>
        {props.name}
      </label>
      <div className="relative">
        {/* main input */}
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={`w-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className}`}
        />

        {/* suffix */}
        {props.suffix && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
            {props.suffix}
          </div>
        )}
      </div>
    </div>
  );
}
