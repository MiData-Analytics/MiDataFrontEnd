export function Button({ children, onClick }) {
  return (
    <button
      className="px-10 py-2 bg-primary text-white rounded-[90px] font-extrabold focus:outline-none focus:ring focus:ring-violet-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
