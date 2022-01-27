const DisplayColumn = (props) => {
  const { colWidth, content } = props;
  return (
    <div className={colWidth}>
      <p className="">{content}</p>
    </div>
  );
};

export default DisplayColumn;
