import React from "react";
import Categorys from "../category/Categorys";

export default function Home() {
  return (
    <div className="panel ">
      <div className="row pt-3 px-5 pb-5">
        <div className="col-12">Home</div>
        <Categorys />
      </div>
    </div>
  );
}
