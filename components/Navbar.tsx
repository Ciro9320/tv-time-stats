import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Records", href: "/records" },
        { name: "Graphs", href: "/graphs" },
    ];

    return (
        <>
            <DesktopNav links={links} />
            <MobileNav links={links} />
        </>
    );
}
