type DatafieldProps = {
  children: React.ReactNode;
  label: string;
  value: string;
};

const Datafield = ({ children, label, value }: DatafieldProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 border-2 border-secondary flex justify-center items-center mr-1">
          {children}
        </div>
        <p className="font-poppins font-light text-xs md:text-sm text-primary">
          {label} :
        </p>
      </div>
      <p className="font-poppins font-light text-xs md:text-base text-primary">
        {value}
      </p>
    </div>
  );
};

export default Datafield;
