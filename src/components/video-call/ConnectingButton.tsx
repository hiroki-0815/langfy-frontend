type Props = {
  buttonText: string;
  onClickHandler: () => void;
};

const ConnectingButton = ({ buttonText, onClickHandler }: Props) => {
  return <button onClick={onClickHandler}>{buttonText}</button>;
};

export default ConnectingButton;
