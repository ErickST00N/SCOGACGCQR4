import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";
import "./MapsSchool.css";
function MapsSchool() {
  return (
    <div className="MapSchool container-md">
      <h1 className="display-1 text-center" >Ubicanos!</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15054.376712369289!2d-97.9665994!3d19.386717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cffced901ddce7%3A0x900a8087658724ce!2sUniversidad%20Tecnol%C3%B3gica%20de%20Tlaxcala!5e0!3m2!1ses!2smx!4v1696805099995!5m2!1ses!2smx"
        allowFullScreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapsSchool;
