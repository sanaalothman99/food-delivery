const steps = ['pending', 'accepted', 'preparing', 'on_the_way', 'delivered'];

const OrderTracker = ({ status }) => {
  const currentStep = steps.indexOf(status);

  return (
    <div className="flex justify-between items-center relative">
      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
            ${index <= currentStep ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'}`}>
            {index < currentStep ? '✓' : index + 1}
          </div>
          <p className="text-xs text-gray-500 mt-2 capitalize">{step.replace('_', ' ')}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderTracker;