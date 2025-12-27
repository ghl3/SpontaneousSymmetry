export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer">
      &copy; Copyright {currentYear}, George Herbert Lewis.
    </div>
  );
}

