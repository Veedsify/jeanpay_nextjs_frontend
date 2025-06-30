import Image from "next/image";

export default function Logo(){
    return (
        <div className="flex items-center justify-center">
            <Image
                src="/logo.png"
                alt="JeanPay Logo"
                className="dark:invert"
                width={180}
                height={38}
            />
        </div>
    );
}