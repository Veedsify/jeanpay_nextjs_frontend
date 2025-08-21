import Link from "next/link";
import AuthPageHeader from "./AuthPageHeader";
import AuthPageFooter from "./AuthPageFooter";

const TwofactorAuth = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[1200px] w-full bg-white rounded-2xl p-8">
        <AuthPageHeader />
        <div className="lg:flex relative items-center justify-center gap-32 my-16 lg:my-32 min-h-[30vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Two-Factor Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please enter the verification code sent to your registered email
              address to continue.
            </p>
          </div>
        </div>
        <div className="py-5 text-center">
          <Link
            href={"/"}
            className="font-semibold  underline text-jean-orange hover:text-cyan-dark hover:no-underline"
          >
            Can&apos;t Login?
          </Link>
          <AuthPageFooter />
        </div>
      </div>
    </div>
  );
};

export default TwofactorAuth;
