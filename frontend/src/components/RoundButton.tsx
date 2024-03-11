function RoundedBtn({ icon, onClick, mutedColor = false }) {
  const handleButtonClick = () => {
    // Call the provided onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`text-xl p-2 rounded-full hover:bg-[#3c454c] ${
        mutedColor ? "text-[#8796a1]" : "text-white"
      }`}
      onClick={handleButtonClick}
    >
      {icon}
    </button>
  );
}

export default RoundedBtn;
