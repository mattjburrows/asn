'use strict';

define([
  'jquery'
], function ($) {
    function findControl($container, controlName) {
        return $container.find('[data-control-name=%s]'.replace('%s', controlName));
    }

    function setControlsProperty($container, controlNames, propName, value) {
        $.each(controlNames, function (index, controlName) {
            $container.find(findControl($container, controlName)).prop(propName, value);
        });
    }

    function disableControls($container, controlNames) {
        setControlsProperty($container, controlNames, 'disabled', true);
    }

    function enableControls($container, controlNames) {
        setControlsProperty($container, controlNames, 'disabled', false);
    }

    function controlInteraction($container, actionName) {
        fireEvent($container, 'controlAction', {actionName: actionName});
    }

    function updateControls($container, params) {
        var controlsToDisable = params.disable || [];
        var controlsToEnable = params.enable || [];

        disableControls($container, controlsToDisable);
        enableControls($container, controlsToEnable);

        fireEvent($container,
            'controlsUpdated',
            {
              disabled: controlsToDisable,
              enabled: controlsToEnable
            }
        );
    }

    function cancelEvent(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function fireEvent($container, eventName, eventParams) {
        $container.trigger(eventName, eventParams);
    }

    return {
        bind: function bind($container) {
          $container.on('update', function (e, params) {
                    updateControls($container, params);
                });

          $container.on('click', '.js-control-item', function (e) {
                  cancelEvent(e);
                  controlInteraction($container, $(this).attr('data-control-name'));
                });
        }
    };
});
