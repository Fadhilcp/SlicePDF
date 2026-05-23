import { IconGithub, IconScissors } from "../icons/Icons"

export const Footer = () => {
    return (
        <footer className="footer">
          <div>
            <div className="footer-brand">
              <span style={{ color: "#e85d2a", display: "flex" }}><IconScissors /></span>
              <span className="footer-brand-name">Slice<span>PDF</span></span>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} SlicePDF. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <span className="footer-divider" />
            <a href="#" className="footer-link">Terms</a>
            <span className="footer-divider" />
            <a href="#" className="footer-link"><IconGithub /> GitHub</a>
          </div>
        </footer>
    )
}