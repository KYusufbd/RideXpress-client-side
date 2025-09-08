import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary/10 text-base-content w-full">
      <div className="flex flex-row flex-wrap items-center justify-center md:justify-between p-3 w-240 max-w-full mx-auto gap-4">
        <Link
          to="/"
          className="flex flex-row justify-center items-center py-4 gap-4"
        >
          <div className="h-12">
            <img src="/logo-wheel.png" alt="Logo" className="h-full" />
          </div>
          <h2 className="text-start text-primary text-2xl font-semibold">
            RideXpress
          </h2>
        </Link>
        <div className="flex flex-row flex-wrap-reverse justify-center md:justify-between items-center gap-4 md:w-2/3 max-w-full">
          <div className="py-1">
            <h3 className="text-center text-sm">
              © 2024 Sinjab Tech. All rights reserved
            </h3>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Link to="https://www.facebook.com" target="_blank" className="h-8">
              <img
                src="./icons/facebook.png"
                alt="facebook-icon"
                className="h-full"
              />
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              className="h-8"
            >
              <img
                src="./icons/instagram.png"
                alt="instagram-icon"
                className="h-full"
              />
            </Link>
            <Link to="https://www.twitter.com" target="_blank" className="h-8">
              <img
                src="./icons/twitter.png"
                alt="twitter-icon"
                className="h-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
