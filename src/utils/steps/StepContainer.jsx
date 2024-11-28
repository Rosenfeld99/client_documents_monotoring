const StepContainer = ({ addingCustomStyele, steps, handleNext }) => {
  return (
    <div className="items-center w-full pt-3 flex ">
      {/* Step 1 */}
      {steps && steps?.prevData && steps?.prevData?.map((option, index) => (
        <div onClick={() => handleNext(option)} key={index} className={` flex items-center w-full ${addingCustomStyele}`}>
          <div className="flex items-center bg-success justify-center min-w-24 h-8 px-5 border-2 rounded-lg border-success shadow-sm">
            <span className="text-background font-semibold text-sm text-nowrap">{option}</span>
          </div>
          <div className={`h-1 w-full ${index == steps?.prevData?.length - 1 ? "bg-gradient-to-l from-success to-border" : "bg-success"} `} />
        </div>))}

      {steps && steps?.nextData && steps?.nextData?.map((option, index) => (
        <div onClick={() => handleNext(option)} key={index} className=" flex items-center w-full">
          <div className="flex items-center justify-center min-w-24 h-8 px-5 border-2 rounded-lg border-border shadow-sm">
            <span className="text-text font-semibold text-sm text-nowrap">{option}</span>
          </div>
          {index !== steps?.prevData?.length - 1 && <div className="h-1 w-full bg-border" />}
        </div>
      ))}

    </div>
  );
};

export default StepContainer;
