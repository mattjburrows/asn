'use strict';

define(function () {
  return `<nav class="main-nav">
    <div class="main-nav__top">
      <a href="#" class="main-nav__top__logo"><img src="/images/iplayer-logo.svg" alt="iPlayer" /></a>
      <ul class="main-nav__list">
        <li class="main-nav__list__toggle">
          <button class="main-nav__toggle js-toggle-dropdown">Menu</button>
        </li>
      </ul>
    </div>
    <ul class="main-nav__dropdown">
      <li class="main-nav__dropdown__item">
        <button class="main-nav__link js-toggle-nested" data-id="1">
          Channels
          <span class="main-nav__link__arrow"></span>
        </button>
        <div class="main-nav__nested">
          <div class="ribbon-navigation">
            <ul class="ribbon-navigation__inner">
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">BBC One</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">BBC Two</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">BBC Three</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">BBC Four</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Radio 1</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">CBBC</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">CBeebies</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">News 24</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">BBC Parliament</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">BBC Alba</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">S4C</a></li>
            </ul>
          </div>
        </div>
      </li>
      <li class="main-nav__dropdown__item">
        <button href="#" class="main-nav__link js-toggle-nested">
          Categories
          <span class="main-nav__link__arrow"></span>
        </button>
        <div class="main-nav__nested">
          <div class="ribbon-navigation">
            <ul class="ribbon-navigation__inner">
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Arts</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">CBBC</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">CBeebies</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Comedy</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Documentaries</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Drama &amp; Soaps</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Entertainment</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Films</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Food</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">History</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Lifestyle</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Music</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">News</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Science &amp; Nature</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Sport</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Audio Described</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Signed</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Northern Ireland</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Scotland</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Wales</a></li>
            </ul>
          </div>
        </div>
      </li>
      <li class="main-nav__dropdown__item">
        <a href="#" class="main-nav__link">A-Z</a>
      </li>
      <li class="main-nav__dropdown__item">
        <a href="#" class="main-nav__link">TV Guide</a>
      </li>
      <li class="main-nav__dropdown__item">
        <a href="#" class="main-nav__link js-toggle-nested">
          My Programmes
          <span class="main-nav__link__arrow"></span>
        </a>
        <div class="main-nav__nested">
          <div class="ribbon-navigation">
            <ul class="ribbon-navigation__inner">
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Watching</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Added</a></li>
              <li class="ribbon-navigation__item"><a href="#" class="ribbon-navigation__link">Purchases</a></li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </nav>`;
})
