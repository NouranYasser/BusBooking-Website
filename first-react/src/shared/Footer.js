import React from "react";
import "../components/style/Footer.css";
    const Footer = () => {
    return(
 
        <>
         <div className="footer">
        <div className="box-container">
          <div className="box">
            <h3>about us</h3>

            <p>
              this is website made for helwan university (bus project) made
              perfectly for you and your happiness. Gmail : @
            </p>
          </div>
          <div className="box">
            <h3>locations</h3>
            <a
              target="_blank"
              href="https://www.google.com/maps/place/Helwan+University/@29.9610499,31.2062547,31420m/data=!3m1!1e3!4m9!1m2!2m1!1shelwan+university!3m5!1s0x145836f34a58de69:0x49853855f032462a!8m2!3d29.8668662!4d31.3152702!15sChFoZWx3YW4gdW5pdmVyc2l0eZIBCnVuaXZlcnNpdHk"
            >
              Egypt
            </a>
            <br />

            <a
              target="_blank"
              href="https://www.google.com/maps/place/Air+Force+Specialized+Hospital/@30.0175187,31.3641068,31403m/data=!3m1!1e3!4m9!1m2!2m1!1shospitals+in++usa!3m5!1s0x14583cd75153e123:0xd6d98616e2c385f7!8m2!3d30.0175187!4d31.4341446!15sChFob3NwaXRhbHMgaW4gIHVzYVoSIhBob3NwaXRhbHMgaW4gdXNhkgERbWlsaXRhcnlfaG9zcGl0YWyaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTlhiMXB4U0U1M0VBRQ"
            >
              USA
            </a>
            <br />
          </div>
          <div className="box">
            <h3>quick links</h3>
            <a href="/hOME">home</a>
          </div>
        </div>
      </div>

        </>
 
    );
    };
    export default Footer;
