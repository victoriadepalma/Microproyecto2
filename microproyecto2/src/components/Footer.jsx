import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
       
            <p>Suramericana de Espectáculos S.A. RIF: J-00045832-4 || © Copyright 2023. CINENOVA. Todos los derechos reservados</p>
          </div>
          <div className="col-md-6">
           
            <ul>
              <li><a href="tel:+1234567890">123-456-7890</a></li>
              <li><a href="mailto:info@ejemplo.com">info@cinenova.com</a></li>
              <li><a href="#"></a></li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;