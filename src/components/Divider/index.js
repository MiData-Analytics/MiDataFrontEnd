export function Divider({color}){
    return (
      <div className="flex items-center mt-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <div className={`mx-4 ${color ? color : 'text-black'}`}>OR</div>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
    );
}