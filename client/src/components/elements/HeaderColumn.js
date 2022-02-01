const HeaderColumn = (props) => {
  const { display, headerText } = props;
  return (
    <div className={display}>
      <h6 className="text-center">{headerText}</h6>
    </div>
  );
};

export default HeaderColumn;
