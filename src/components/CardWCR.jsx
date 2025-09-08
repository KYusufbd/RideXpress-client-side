const CardWCR = ({ icon, heading, desc }) => {
  return (
    <div
      className="flex flex-col items-center gap-4 text-center bg-primary/10 p-6 
    rounded-lg shadow-xl h-full"
    >
      <div className="w-24 rounded-full flex items-center justify-center">
        <img src={icon} alt="icon" className="w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-primary">{heading}</h3>
        <p className="text-lg text-secondary/80">{desc}</p>
      </div>
    </div>
  );
};

export default CardWCR;
