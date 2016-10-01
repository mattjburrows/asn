define([
  'jquery',
  'lodash'
], function ($, _) {
  function bind() {
    var $document = $(document);
    var jsToggleDropdown = document.querySelectorAll('.js-toggle-dropdown')[0];
    var list = document.querySelectorAll('.main-nav__list')[0];
    var dropdown = document.querySelectorAll('.main-nav__dropdown')[0];
    var dropdownItems = dropdown.querySelectorAll('.main-nav__dropdown__item');
    var linkCount = (dropdownItems.length - 1);
    var listToggleItem = list.querySelectorAll('.main-nav__list__toggle')[0];
    var listToggleItemWidth = outerWidth(listToggleItem);
    var states = {
      expanded: 'is-expanded',
      populated: 'is-populated',
      hidden: 'is-hidden',
      clone: 'is-clone',
      active: 'is-active'
    };
    var windowResize = _.debounce(function () {
      removeLinks();
      buildNavigationItems();
    }, 150);

    function removeLinks() {
      list.removeAttribute('style');
      Array.prototype.forEach.call(list.querySelectorAll('.' + states.clone), function (listItem) {
        listItem.parentNode.removeChild(listItem);
      });

      dropdown
        .querySelectorAll('.main-nav__nested')[0]
        .classList.remove(states.expanded);

      Array.prototype.forEach.call(dropdownItems, function(dropdownItem) {
        dropdownItem.classList.remove(states.hidden);
      });
    }

    function toggleListToggleItem(listWidthExceeded, allItemsVisible) {
      if (!listWidthExceeded || allItemsVisible) {
        listToggleItem.classList.add(states.hidden);
      } else {
        listToggleItem.classList.remove(states.hidden);
      }
    }

    function outerWidth(el) {
      var style = window.getComputedStyle(el, null);
      var width = style.width;

      return width + parseInt(style.marginLeft) + parseInt(style.marginRight);
    }

    function buildNavigationItems() {
      listToggleItem.classList.remove(states.hidden);

      var itemsWidth = outerWidth(listToggleItem);
      var listWidth = list.outerWidth;
      var visibleItems = 0;
      var listWidthExceeded;

      Array.prototype.forEach.call(dropdownItems, function cloneLinks(item, i) {
        visibleItems = i;

        var itemInner = item.innerHTML;
        var listItem = document.createElement('li');

        listToggleItem.parentNode.insertBefore(listItem, listToggleItem.parentNode.lastChild);
        listItem.innerHTML = itemInner;
        listItem.classList.add('main-nav__list__item', states.clone);

        itemsWidth += outerWidth(listItem);
        listWidthExceeded = (itemsWidth + listToggleItemWidth) >= listWidth;

        item.classList.add(states.hidden);

        if (listWidthExceeded) {
          return false;
        }
      });

      toggleListToggleItem(listWidthExceeded, (visibleItems === linkCount));
    }

    function toggleDropdown() {
      dropdown.classList.toggle(states.expanded);
    }

    function setExpandedDropdownClass(dropdown) {
      var expandedNavigation = document.querySelectorAll('.main-nav__nested.' + states.expanded)[0];
      var removeExpandedClass = (expandedNavigation !== undefined) && (dropdown !== expandedNavigation);

      if (removeExpandedClass) {
        expandedNavigation.classList.remove(states.expanded);
      }
      dropdown.classList.toggle(states.expanded);
    }

    function setActiveButtonClass(btn) {
      var activeBtn = document.querySelectorAll('.main-nav__link.' + states.active)[0];
      var removeActiveClass = (activeBtn !== undefined) && (btn !== activeBtn);

      if(removeActiveClass) {
        activeBtn.classList.remove(states.active);
      }
      btn.classList.toggle(states.active);
    }

    function positionNestedDropdown(btn, dropdown, $list) {
      var isClone = btn.parentNode.classList.contains(states.clone);
      var isDropdownExpanded = dropdown.classList.contains(states.expanded);

      if (isClone && isDropdownExpanded) {
        var paddingBottomValue = dropdown.offsetHeight;
        list.style.paddingBottom = paddingBottomValue + 'px';
      } else {
        list.removeAttribute('style');
      }
    }

    function getSiblings(element, selector) {
      return Array.prototype.filter.call(element.parentNode.querySelectorAll(selector), function (child) {
        return child !== element;
      });
    }

    function toggleNestedDropdown(event) {
      var btn = event.target;
      var dropdown = getSiblings(btn, '.main-nav__nested')[0];

      setExpandedDropdownClass(dropdown);
      setActiveButtonClass(btn);
      positionNestedDropdown(btn, dropdown);
    }

    window.removeEventListener('resize', windowResize);
    window.addEventListener('resize', windowResize);

    $document
      .off('click.toggle-sub-navigation')
      .on('click.toggle-sub-navigation', '.js-toggle-nested', toggleNestedDropdown);

    jsToggleDropdown.removeEventListener('click', toggleDropdown);
    jsToggleDropdown.addEventListener('click', toggleDropdown);

    buildNavigationItems();
  }

  return {
    bind: bind
  };
});
