import Link from "next/link";

const AuthPageFooter = () => {
  return (
    <div className="flex items-center justify-center space-y-6 mt-6">
      <ul className="flex items-center justify-center gap-4 ">
        <li className="font-medium  hover:underline hover:text-jean-orange text-cyan-dark no-underline">
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li className="font-medium  hover:underline hover:text-jean-orange text-cyan-dark no-underline">
          <Link href="/terms-conditions">Terms of Service</Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthPageFooter;
