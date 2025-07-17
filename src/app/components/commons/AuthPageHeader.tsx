import Logo from "../ui/Logo";

const AuthPageHeader = ({
  text = "Sign in to your Account",
}: {
  text: string;
}) => {
  return (
    <div className="text-center mb-8">
      <Logo height={64} width={64} />
      <h1 className="text-2xl font-bold text-cyan-dark mt-4">
        Jean<span className="italic text-jean-orange">Pay</span>
      </h1>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
};

export default AuthPageHeader;
