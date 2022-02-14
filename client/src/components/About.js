import React, { Fragment } from "react";
import Navbar from "./Navbar";

function About() {
  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white p-5 justify-content-center">
          <h1>About</h1>
          <p>
            Startup MVP customer partnership freemium android monetization focus
            A/B testing metrics rockstar. Rockstar responsive web design
            termsheet graphical user interface ownership investor. Long tail
            entrepreneur investor market conversion startup sales focus product
            management network effects handshake first mover advantage success
            prototype. Influencer client founders marketing. Twitter equity
            backing. Learning curve market angel investor.
          </p>
          <p>
            Vesting period social proof backing. Value proposition
            business-to-business churn rate metrics non-disclosure agreement
            responsive web design assets success sales funding branding
            ownership hackathon product management. Virality angel investor
            partnership gen-z hypotheses validation. Branding marketing
            technology investor customer disruptive creative gen-z angel
            investor learning curve. Crowdfunding partner network ownership.
            Incubator vesting period focus release buzz.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
