type button = {
  type?: "submit" | "button" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button(props: button) {
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={`bg-primary hover:bg-primary/50 text-white font-bold py-3 rounded w-full transition-colors duration-300 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
