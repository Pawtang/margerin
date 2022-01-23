const HeaderColumn = (props) => {
  const { colWidth, headerText } = props;
  return (
    <div className={colWidth}>
      <h6 className="text-center">{headerText}</h6>
    </div>
  );
};

export default HeaderColumn;
