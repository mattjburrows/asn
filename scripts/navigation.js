define([
  'jquery',
  'lodash'
], function ($, _) {
  function bind() {
    var $window = $(window);
    var $document = $(document);
    var $jsToggleDropdown = $('.js-toggle-dropdown');
    var $list = $('.main-nav__list');
    var $dropdown = $('.main-nav__dropdown');
    var $dropdownItems = $dropdown.find('.main-nav__dropdown__item');
    var linkCount = ($dropdownItems.length - 1);
    var $listToggleItem = $list.find('.main-nav__list__toggle');
    var listToggleItemWidth = $listToggleItem.outerWidth();
    var states = {
      expanded: 'is-expanded',
      populated: 'is-populated',
      hidden: 'is-hidden',
      clone: 'is-clone',
      active: 'is-active'
    };
    var listItemOptions = {
      'class': 'main-nav__list__item ' + states.clone
    };
    var windowResize = _.debounce(function () {
      removeLinks();
      buildNavigationItems();
    }, 150);

    function removeLinks() {
      $list
        .removeAttr('style')
        .find('.' + states.clone)
          .remove();

      $dropdown
        .find('.main-nav__nested')
          .removeClass(states.expanded);

      $dropdownItems.removeClass(states.hidden);
    }

    function toggleListToggleItem(listWidthExceeded, allItemsVisible) {
      if (!listWidthExceeded || allItemsVisible) {
        $listToggleItem.addClass(states.hidden);
      } else {
        $listToggleItem.removeClass(states.hidden);
      }
    }

    function buildNavigationItems() {
      $listToggleItem.removeClass(states.hidden);

      var itemsWidth = $listToggleItem.outerWidth(true);
      var listWidth = $list.width();
      var visibleItems = 0;
      var listWidthExceeded;

      $dropdownItems.each(function cloneLinks(i, item) {
        visibleItems = i;

        var $item = $(item);
        var $itemInner = $($item.html());
        var $listItem = $('<li>', listItemOptions).append($itemInner);

        $listItem.insertBefore($listToggleItem);

        itemsWidth += $listItem.outerWidth(true);
        listWidthExceeded = (itemsWidth + listToggleItemWidth) >= listWidth;

        $item.addClass(states.hidden);

        if (listWidthExceeded) {
          return false;
        }
      });

      toggleListToggleItem(listWidthExceeded, (visibleItems === linkCount));
    }

    function toggleDropdown() {
      $dropdown.toggleClass(states.expanded);
    }

    function setExpandedDropdownClass($dropdown){
      var $expandedNavigation = $('.main-nav__nested.' + states.expanded);

      if (!$dropdown.is($expandedNavigation)) {
        $expandedNavigation.removeClass(states.expanded);
      }
      $dropdown.toggleClass(states.expanded);
    }

    function setActiveButtonClass($btn) {
      var $activeBtn = $('.main-nav__link.' + states.active);

      if(!$btn.is($activeBtn)) {
        $activeBtn.removeClass(states.active);
      }
      $btn.toggleClass(states.active);
    }

    function positionNestedDropdown($btn, $dropdown, $list) {
      var isClone = $btn.parent().hasClass(states.clone);

      if (isClone && $dropdown.hasClass(states.expanded)) {
        var paddingBottomValue = $dropdown.height();
        $list.css('padding-bottom', paddingBottomValue);
      } else {
        $list.removeAttr('style');
      }
    }

    function toggleNestedDropdown() {
      var $btn = $(this);
      var $dropdown = $btn.siblings('.main-nav__nested');

      setExpandedDropdownClass($dropdown);
      setActiveButtonClass($btn);
      positionNestedDropdown($btn, $dropdown, $list);
    }

    $window
      .off('resize.build-navigation-items')
      .on('resize.build-navigation-items', windowResize);
    $document
      .off('click.toggle-sub-navigation')
      .on('click.toggle-sub-navigation', '.js-toggle-nested', toggleNestedDropdown);
    $jsToggleDropdown
      .off('click.toggle-navigation')
      .on('click.toggle-navigation', toggleDropdown);

    buildNavigationItems();
  }

  return {
    bind: bind
  };
});
