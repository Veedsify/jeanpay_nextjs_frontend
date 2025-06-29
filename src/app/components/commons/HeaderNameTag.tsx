import Image from "next/image";

export default function HeaderNameTag() {
    return (
        <div className={"flex gap-5 items-center"}>
            <h1 className="text-2xl font-bold text-cyan-dark">Andrew Garfield</h1>
            <Image
                src={"/avatar.jpg"}
                alt={"profile picture"}
                width={50}
                height={50}
                className={"rounded-full aspect-square border object-cover border-cyan-dark"}
            />
        </div>
    )
}