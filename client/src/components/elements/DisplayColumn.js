const DisplayColumn = (props) => {
  const { display, content } = props;
  return (
    <div className={display}>
      <p className="">{content}</p>
    </div>
  );
};

export default DisplayColumn;
