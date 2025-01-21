interface IconBtnProps {
  icon: string;
  onClick: () => void;
  color?: string;
}
export const IconBtn = ({ icon, onClick = () => {} }: IconBtnProps) => {
  return (
    <button
      className={`rounded-md w-10 h-10 hover:bg-slate-500 text-slate-500 hover:text-white p-2`}
      id="bookmarkBtn"
      onClick={onClick}
    >
      <i className={`${icon} text-xl`} />
    </button>
  );
};
