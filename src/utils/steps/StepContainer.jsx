const StepContainer = ({ addingCustomStyele, steps, handleNext }) => {
  
  return (
    <div className="items-center w-full pt-3 flex select-none cursor-not-allowed">
      {/* Previous Steps */}
      {steps?.prevData?.map((option, index) => (
        <div
          key={index}
          className={`flex items-center w-full ${addingCustomStyele}`}
        >
          <div className="flex items-center bg-success justify-center h-8 px-5 border-2 rounded-lg border-success shadow-sm">
            <span className="text-background font-semibold text-sm text-nowrap">{option?.name}</span>
          </div>
          {steps?.nextData?.length > 0 && steps?.prevData?.length - 1 == index && <div className="h-1 w-full bg-gradient-to-l from-success to-border" />}
          {index != steps?.prevData?.length - 1 && <div className="h-1 w-full bg-success" />}
        </div>
      ))}

      {/* Next Steps */}
      {steps?.nextData?.map((option, index) => (
        <div
          key={index}
          className="flex items-center w-full"
        >
          <div className="flex items-center justify-center h-8 px-5 border-2 rounded-lg border-border shadow-sm">
            <span className="text-text font-semibold opacity-30 text-sm text-nowrap">{option?.name}</span>
          </div>
          {index !== steps?.nextData?.length - 1 && <div className="h-1 w-full bg-border" />}
        </div>
      ))}
    </div>
  );
};

export default StepContainer;
