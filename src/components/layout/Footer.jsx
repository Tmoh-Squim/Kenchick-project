import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="w-full 800px:p-[3rem] p-1 bg-blue-200 flex 800px:justify-around flex-wrap">
        <div className="block 800px:w-[20%] w-[60%]">
          <h1 className="my-2 text-xl text-blue-500">Our Location</h1>

          <p>
            Kenchic LTD Head Office, Exsan Hse, Enterprise Rd P.O. BOX 20052,
            00200 Nairobi, Kenya
          </p>
        </div>
        <div className="block 800px:w-[20%] w-[60%]">
          <h1 className="my-2 text-xl text-blue-500">Customer Support</h1>

          <p>
            HQ: +254 722 202 163 <br />
            Foods: +254 703 056 056 <br />
             DOC: +254 703 056 055 <br />
            Email: info@kenchic.com <br />
             DOC: doccustomerservice@kenchic.com
          </p>
        </div>

        <div className="block 800px:w-[20%] w-[60%]">
          <h1 className="my-2 text-xl text-blue-500">Our Socials</h1>

          <p>
            Kenchic LTD Head Office, Exsan Hse, Enterprise Rd P.O. BOX 20052,
            00200 Nairobi, Kenya
          </p>
        </div>
      </div>

      <div className="p-[2rem] bg-pink-200 w-full 800px:flex justify-center hidden ">
        <div className="800px:w-[35%]">
          <h1 className="text-blue-500 ">&copy; 2024 Kenchic LTD</h1>
        </div>
        <div className="800px:w-[35%]">
          <Link className="text-blue-500 border-b-2 border-black hover:border-b-none">
            Terms & Conditions
          </Link>
          <Link className="mx-4 text-blue-500 border-b-2 border-black hover:border-b-none">
            Privacy Policy
          </Link>
          <Link className="text-blue-500 border-b-2 border-black hover:border-b-none">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
