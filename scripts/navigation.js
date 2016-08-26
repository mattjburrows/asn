define([
  'jquery',
  'lodash'
], function ($, _) {
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
    clone: 'is-clone'
  };
  var listItemOptions = {
    'class': 'main-nav__list__item ' + states.clone
  };
  var windowResize = _.debounce(function () {
    removeLinks();
    buildNavigationItems();
  }, 150);

  function removeLinks() {
    $list.find('.' + states.clone).remove();
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

  function toggleNestedDropdown() {
    var $btn = $(this);
    var $sibling = $btn.siblings('.main-nav__nested');
    var $expandedNavigation = $('.main-nav__nested.' + states.expanded);
    var isClone = $btn.parent().hasClass(states.clone);

    if (!$sibling.is($expandedNavigation)) {
      $expandedNavigation.removeClass(states.expanded);
    }
    $sibling.toggleClass(states.expanded);

    if (isClone) {
      var paddingBottomValue = $sibling.hasClass(states.expanded) ? $sibling.height() : 0;
      $list.css('padding-bottom', paddingBottomValue);
    }
  }

  return {
    bind: function () {
      $window.on('resize', windowResize);
      $document.on('click', '.js-toggle-nested', toggleNestedDropdown);
      $jsToggleDropdown.on('click', toggleDropdown);

      buildNavigationItems();
    }
  };
});
