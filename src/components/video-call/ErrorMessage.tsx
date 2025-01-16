type Props = {
  errorMessage: string | null;
};

const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    <div className="text-red-600">{errorMessage && <p>{errorMessage}</p>}</div>
  );
};

export default ErrorMessage;
