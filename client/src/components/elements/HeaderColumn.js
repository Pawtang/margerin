const HeaderColumn = (props) => {
  const { display, headerText } = props;
  const divStyle = { height: "20px" };
  const hasHeaderText = headerText && headerText.trim().length > 0;
  return (
    <div className={`${display}`} style={divStyle}>
      {hasHeaderText && <h6 className="text-center">{headerText}</h6>}
    </div>
  );
};

export default HeaderColumn;
