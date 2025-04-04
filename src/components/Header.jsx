import React from "react";

export default function Header() {
  return (
    <header className="d-flex justify-content-between p-3">
      <a href="/" className="wrap-logo">
        <img className="logo" src="./img/logo.png" alt="checklist" />
        <span>
          <strong>Check</strong>List
        </span>
      </a>

      <div className="">
        <form action="" className="search-bar">
          <input type="search" name="search" pattern=".*\S.*" required />
          <button className="search-btn" type="submit">
            <span>Search</span>
          </button>
        </form>
      </div>

      <div className="wrap-user">
        <div className="user-panel">
          <div className="show-fav-list">
            <div
              className="user-list-img"
              // style="background-image: url(./img/imgList/argentina.png)"
            >
              &nbsp;
            </div>
            <div>
              100 cosas para hacer en
              <br />
              <strong>Argentina</strong>
            </div>
          </div>
        </div>

        <div className="user">
          <a href="#!" className="user-avatar" title="edit">
            <img src="./img/useravatar.png" alt="Martina" />
          </a>
          <a href="#!" className="user-name">
            Martin
          </a>
          <a href="#!" className="user-menu">
            &#8942;
          </a>
        </div>
      </div>
    </header>
  );
}
