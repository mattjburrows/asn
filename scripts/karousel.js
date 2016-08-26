'use strict';

define([
  'jquery',
  'lodash',
  'components/controls/mediator',
  'components/scrollbar/mediator',
  'utils/browser'
], function (
    $,
    _,
    controls,
    scrollbar,
    browser
  ) {
  var GRADIENT_WIDTH = 120;
  var CAROUSEL_BP4 = 1108;

  function bind($container, $tviplayer) {
    var body = $('body');
    var $controls = $container.find('.controls');
    var $wrapper = $container.find('.carousel__wrapper');
    var $inner = $container.find('.carousel__inner');
    var $items = $container.find('.carousel__item');
    var $scrollbar = $container.find('.scrollbar');
    var $list = $container.find('.carousel__list');
    var $controlsItem = $container.find('.controls__item');
    var $secondCarouselItem = $items.eq(1);
    var state = getState();
    var tabSize = updateScrollbarWidth();
    var isMoving = false;

    setListWidth();

    bindControls();
    bindScroll();
    unhideMasterbrand();

    $(window).on('resize', resizeEventHandler($container));

    function updateControls(updates) {
      $controls.trigger('update', updates);
    }

    function unhideMasterbrand() {
      var $masterbrandElements = $items.find('.js-toggle-masterbrand');
      $masterbrandElements.removeClass('is-hidden js-toggle-masterbrand');
    }

    function isCarouselBP4() {
      return body.width() > CAROUSEL_BP4;
    }

    function getLeftPosition() {
      return $inner.scrollLeft();
    }

    function getState() {
      var itemWidth = parseInt($items.width(), 10);
      var controlsOverlapWidth = $controlsItem.width();
      var viewportWidth = calculateCarouselViewportWidth();

      var visibleViewPort = viewportWidth;
      var numberOfFullyVisibleItems;
      if (isCarouselBP4()) {
        numberOfFullyVisibleItems = parseInt(visibleViewPort / itemWidth, 10);
      } else {
        visibleViewPort -= controlsOverlapWidth;
        numberOfFullyVisibleItems = parseInt((visibleViewPort - controlsOverlapWidth) / itemWidth, 10);
      }

      var itemMargin = parseInt($secondCarouselItem.css('margin-left'), 10);
      var contentWidth = 0;
      $items.each(function () {
        contentWidth += $(this).outerWidth(true);
      });
      var listWidth = contentWidth + (GRADIENT_WIDTH * 2);

      return {
        contentWidth: contentWidth,
        itemWidth: itemWidth,
        numberOfFullyVisibleItems: numberOfFullyVisibleItems || 1,
        viewportWidth: viewportWidth,
        itemMargin: itemMargin,
        listWidth: listWidth
      };
    }

    function isAtBeginning() {
      return getLeftPosition() === 0;
    }

    function isAtEnd() {
      return (state.contentWidth - getLeftPosition()) <= state.viewportWidth;
    }

    function visibleItemWidth() {
      return ((state.itemWidth) * state.numberOfFullyVisibleItems) + ((state.numberOfFullyVisibleItems) * state.itemMargin);
    }

    function getPreviousPosition() {
      var itemMargin = state.itemMargin;
      var itemWidth = state.itemWidth;
      var itemSize = itemWidth + itemMargin;
      var scrolledNumber = getNumberScrolled(itemSize);

      if (isWholeNumber(scrolledNumber)) {
        return getLeftPosition() - visibleItemWidth();
      } else {
        var wholeScrolledNumber = Math.floor(scrolledNumber);
        return (wholeScrolledNumber * itemSize) - ((state.numberOfFullyVisibleItems - 1) * itemSize);
      }
    }

    function getNextPosition() {
      var itemMargin = state.itemMargin;
      var itemWidth = state.itemWidth;
      var itemSize = itemWidth + itemMargin;
      var scrolledNumber = getNumberScrolled(itemSize);

      if (isWholeNumber(scrolledNumber)) {
        return getLeftPosition() + visibleItemWidth();
      } else {
        var wholeScrolledNumber = Math.floor(scrolledNumber);
        return (wholeScrolledNumber * itemSize) + visibleItemWidth();
      }
    }

    function isWholeNumber(value) {
      return value % 1 === 0;
    }

    function getNumberScrolled(itemSize) {
      var scrollPosition = getLeftPosition();

      return ((scrollPosition) / itemSize);
    }

    function moveTo(position) {
      isMoving = true;
      $inner.animate({'scrollLeft': position + 'px' }, function () {
        updateState($container);
        isMoving = false;
      });
    }

    function moveCarouselToPosition(e, params) {
      if (!isMoving) {
        if (params.actionName === 'next') {
          moveTo(getNextPosition());
        } else if (params.actionName === 'previous') {
          moveTo(getPreviousPosition());
        }
      }
    }

    function updateState() {
      state = getState();
    }

    function setListWidth() {
      var listWidth = state.listWidth;
      $list.width(listWidth);
    }

    function resizeEventHandler() {
      return _.debounce(function () {
        updateState();
        setListWidth();
        updateScrollbarWidth();
        updateScrollbarPosition();
      }, 200);
    }

    function bindControls() {
      controls.bind($controls);
      $controls.on('controlAction', moveCarouselToPosition);
    }

    function updateControlState() {
      if (isAtEnd()) {
        updateControls({enable: ['previous'], disable: ['next']});
        $container.trigger('endStream');
      } else if (isAtBeginning()) {
        updateControls({disable: ['previous'], enable: ['next']});
      } else {
        updateControls({enable: ['previous', 'next']});
      }
    }

    function calculateCarouselViewportWidth() {
      return $container.width();
    }

    function updateScrollbarWidth() {
      tabSize = (state.viewportWidth / state.contentWidth) * 100;
      $scrollbar.trigger('setTabSize', tabSize);
      return tabSize;
    }

    function notInViewportLeft(itemScrollLeft) {
      return (itemScrollLeft < getLeftPosition());
    }

    function notInViewportRight($item) {
      var itemWidth = state.itemWidth;
      var controlOffset = $controls.offset().left;
      var itemOffset = $item.offset().left;

      return ((itemOffset + itemWidth) > controlOffset);
    }

    function resetContainerScrollLeft() {
      browser.onNextTick(function () {
        $tviplayer.scrollLeft(0);
        $wrapper.scrollLeft(0);
      });
    }

    function updateScrollbarPosition() {
        var percentageMoved = ($inner.scrollLeft() / (state.contentWidth - state.viewportWidth));
        var actualScrollWidth = 100 - tabSize;
        var scrollBarPosition = actualScrollWidth * percentageMoved;

        updateControlState();

        $scrollbar.trigger('updatePosition', scrollBarPosition);
    }

    function bindScroll() {
      $items.on('focus', 'a', _.debounce(function () {
        var $item = $(this).closest($items);
        var itemWidth = state.itemWidth;
        var itemMargin = state.itemMargin;
        var itemIndex = $items.index($item);
        var itemSize = itemWidth + itemMargin;
        var itemScrollLeft = itemSize * itemIndex;

        if (notInViewportRight($item)) {
          moveTo(itemScrollLeft);
        } else if (notInViewportLeft(itemScrollLeft)) {
          moveTo(itemScrollLeft - ((state.numberOfFullyVisibleItems - 1) * itemSize));
        }
      }, 100));

      $items.on('blur', 'a', function () {
        resetContainerScrollLeft();
      });

      $inner.on('scroll', updateScrollbarPosition);

      scrollbar.bind($scrollbar, {
          size: calculateCarouselViewportWidth(),
          tabSize: tabSize
        });
    }
  }

  return {
    bind: bind
  };
});
