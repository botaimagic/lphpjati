export default function Footer({ name }) {
    return (
        <footer className="jp-footer">
            &copy; {new Date().getFullYear()} <span>{name}</span>. All Rights Reserved.
        </footer>
    );
}
