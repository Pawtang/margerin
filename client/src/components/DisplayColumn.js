const DisplayColumn = (props) => {
  const { colWidth, content } = props;
  return (
    <div className={colWidth}>
      <p className="text-center">{content}</p>
    </div>
  );
};

export default DisplayColumn;
