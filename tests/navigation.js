'use strict';

define([
  'scripts/navigation',
  'tests/navigationMarkup',
], function (
  navigation,
  navigationMarkup
) {
  describe('Navigation', function () {
    beforeEach(function () {
      $('html').addClass('js');
      $('#test-container').append(navigationMarkup);
    });

    afterEach(function () {
      $('html').removeClass('js');
      $('#test-container').html('');
    });

    it('toggles the navigation dropdown when the menu button is clicked', function () {
      var $menuBtn = $('.js-toggle-dropdown');
      var $dropdown = $('.main-nav__dropdown');
      navigation.bind();
      $menuBtn.trigger('click');
      expect($dropdown.hasClass('is-expanded')).toEqual(true);
    });

    it('toggles the sibling dropdown when a button with an associated dropdown is clicked in the horizontal navigation', function () {
      var $firstDropdownToggle = $('.js-toggle-nested').eq(0);
      var $firstDropdownToggleSibling = $firstDropdownToggle.siblings('.main-nav__nested');
      navigation.bind();
      $firstDropdownToggle.trigger('click');
      expect($firstDropdownToggleSibling.hasClass('is-expanded')).toEqual(true);
    });
  });
});
