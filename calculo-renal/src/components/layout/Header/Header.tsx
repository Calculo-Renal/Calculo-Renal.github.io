import Image from "next/image"
import LogoImage from "@/public/logo.svg"
import Link from "next/link"
import Navigation from "@/src/components/layout/Navigation/Navigation"

export default function Header(): React.ReactElement {
    return (
        <header className="flex gap-10 shadow-md px-[10vw] py-4 sticky top-0 bg-white">
            <Link href="/">
                <Image src={LogoImage} alt="Logo" />
            </Link>
            <Navigation />
        </header>
    )
}
