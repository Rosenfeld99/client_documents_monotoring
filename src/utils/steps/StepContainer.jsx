const StepContainer = ({ addingCustomStyele, steps, handleNext }) => {
  return (
    <div className="items-center w-full pt-3 flex">
      {/* Previous Steps */}
      {steps?.prevData?.map((option, index) => (
        <div
          // onClick={() => handleNext(option)}
          key={index}
          className={`flex items-center w-full ${addingCustomStyele}`}
        >
          <div className="flex items-center bg-success justify-center min-w-24 h-8 px-5 border-2 rounded-lg border-success shadow-sm">
            <span className="text-background font-semibold text-sm text-nowrap">{option?.name}</span>
          </div>
          <div className="h-1 w-full bg-success" />
        </div>
      ))}

      {/* Current Step */}
      {steps?.currentStep && (
        <div className="flex items-center w-full">
          <div
            // onClick={() => handleNext(steps.currentStep)}
            className="flex items-center justify-center min-w-24 h-8 px-5 border-2 border-[#1b7244] shadow-[#71707086] rounded-lg bg-success shadow-lg"
          >
            <span className="text-background font-semibold text-sm text-nowrap">
              {steps.currentStep.name}
            </span>
          </div>
          {steps?.nextData?.length > 0 && <div className="h-1 w-full bg-gradient-to-l from-success to-border" />}
        </div>
      )}

      {/* Next Steps */}
      {steps?.nextData?.map((option, index) => (
        <div
          // onClick={() => handleNext(option)}
          key={index}
          className="flex items-center w-full"
        >
          <div className="flex items-center justify-center min-w-24 h-8 px-5 border-2 rounded-lg border-border shadow-sm">
            <span className="text-text font-semibold text-sm text-nowrap">{option?.name}</span>
          </div>
          {index !== steps?.nextData?.length - 1 && <div className="h-1 w-full bg-border" />}
        </div>
      ))}
    </div>
  );
};

export default StepContainer;
