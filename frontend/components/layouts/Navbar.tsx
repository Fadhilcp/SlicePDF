import { IconScissors } from "@/components/icons/Icons"
import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="navbar">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-icon"><IconScissors /></span>
            <span className="nav-logo-text">Slice<span>PDF</span></span>
          </Link>
          <div className="nav-links">
            <Link href="#" className="nav-link">How it works</Link>
            <Link href="#" className="nav-link">Features</Link>
            <Link href="#" className="nav-link">Pricing</Link>
            <Link href="#" className="nav-cta">Get started</Link>
          </div>
        </nav>
    )
}