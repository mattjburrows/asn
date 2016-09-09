'use strict';

define([
  'lodash',
  'scripts/navigation',
  'tests/navigationMarkup',
], function (
  _,
  navigation,
  navigationMarkup
) {
  describe('Navigation', function () {
    beforeEach(function () {
      $('html').addClass('js');
      $('#test-container').append(navigationMarkup);
      spyOn(_, 'debounce').and.callFake(function (func) {
        return function () {
          func.apply(this, arguments);
        };
      });
    });

    afterEach(function () {
      $('html').removeClass('js');
      $('#test-container').html('');
    });

    it('toggles the sibling dropdown when a button with an associated dropdown is clicked in the horizontal navigation', function () {
      navigation.bind();
      var $firstDropdownToggle = $('.main-nav__list .js-toggle-nested').eq(0);
      var $firstDropdownToggleSibling = $firstDropdownToggle.siblings('.main-nav__nested');

      $firstDropdownToggle.trigger('click');
      expect($firstDropdownToggle.hasClass('is-active')).toEqual(true);
      expect($firstDropdownToggleSibling.hasClass('is-expanded')).toEqual(true);

      $firstDropdownToggle.trigger('click');
      expect($firstDropdownToggle.hasClass('is-active')).toEqual(false);
      expect($firstDropdownToggleSibling.hasClass('is-expanded')).toEqual(false);
    });

    it('clears the active items when the window resizes', function () {
      navigation.bind();
      var $firstDropdownToggle = $('.main-nav__list .js-toggle-nested').eq(0);
      var $firstDropdownToggleSibling = $firstDropdownToggle.siblings('.main-nav__nested');

      $firstDropdownToggle.trigger('click');
      expect($firstDropdownToggle.hasClass('is-active')).toEqual(true);
      expect($firstDropdownToggleSibling.hasClass('is-expanded')).toEqual(true);

      $(window).trigger('resize');

      expect($('.main-nav__list .js-toggle-nested').eq(0).hasClass('is-active')).toEqual(false);
      expect($('.main-nav__list .js-toggle-nested').eq(0).siblings('.main-nav__nested').hasClass('is-expanded')).toEqual(false);
    });

    describe('top nav', function () {
      it('fills the navigation space with the correct amount of items', function () {
        $('.main-nav').css('width', 480);
        navigation.bind();
        var $topNavDropdownToggles = $('.main-nav__list .js-toggle-nested');

        expect($topNavDropdownToggles.length).toEqual(2);
        expect($topNavDropdownToggles.eq(0).text().trim()).toEqual('Channels');
        expect($topNavDropdownToggles.eq(1).text().trim()).toEqual('Categories');

        $('.main-nav').css('width', 360);
        $(window).trigger('resize');

        $topNavDropdownToggles = $('.main-nav__list .js-toggle-nested');

        expect($topNavDropdownToggles.length).toEqual(1);
        expect($topNavDropdownToggles.eq(0).text().trim()).toEqual('Channels');
      });

      it('positions the opened dropdown correctly', function () {
        $('.main-nav').css('width', 480);
        navigation.bind();
        var $firstTopNavDropdownToggle = $('.main-nav__list .js-toggle-nested').eq(0);

        $firstTopNavDropdownToggle.trigger('click');
        expect($('.main-nav__list').css('padding-bottom')).not.toEqual('0px');
      });
    });

    describe('dropdown nav', function () {
      it('hides the items that get pulled into the top nav', function () {
        $('.main-nav').css('width', 480);
        navigation.bind();
        var $dropdownNavDropdownToggles = $('.main-nav__dropdown .main-nav__dropdown__item.is-hidden');

        expect($dropdownNavDropdownToggles.length).toEqual(2);

        $('.main-nav').css('width', 360);
        $(window).trigger('resize');

        $dropdownNavDropdownToggles = $('.main-nav__dropdown .main-nav__dropdown__item.is-hidden');

        expect($dropdownNavDropdownToggles.length).toEqual(1);
      });
    });

    describe('menu toggle button', function () {
      it('hides the button', function () {
        $('.main-nav').css('width', 976);
        navigation.bind();
        var $menuToggle = $('.main-nav .main-nav__list__toggle');

        expect($menuToggle.hasClass('is-hidden')).toEqual(true);
      });

      it('displays the button', function () {
        $('.main-nav').css('width', 480);
        navigation.bind();
        var $menuToggle = $('.main-nav .main-nav__list__toggle');

        expect($menuToggle.hasClass('is-hidden')).toEqual(false);
      });

      it('toggles the navigation dropdown when the button is clicked', function () {
        navigation.bind();
        var $menuBtn = $('.main-nav__list .js-toggle-dropdown');
        var $dropdown = $('.main-nav__dropdown');

        $menuBtn.trigger('click');
        expect($dropdown.hasClass('is-expanded')).toEqual(true);

        $menuBtn.trigger('click');
        expect($dropdown.hasClass('is-expanded')).toEqual(false);
      });
    });
  });
});
