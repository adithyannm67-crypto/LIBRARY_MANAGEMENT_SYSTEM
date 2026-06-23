const AvailbilityBadge = ({ isAvailable}) => {

  return isAvailable ? (
    <span className="badge available">Available</span>
  ) : (
    <span className="badge out-of-stock">Out of Stock</span>
  );
};

export default AvailbilityBadge;
