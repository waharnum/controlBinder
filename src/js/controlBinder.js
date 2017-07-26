/* global fluid, floe */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.controlBinder", {
        gradeNames: ["fluid.viewComponent"],
        // Bind DOM element interactions
        // to invokers
        //
        // Short form...
        //      Selector : "Invoker" (click event)
        // Long form...
        //      key:
        //          {
        //              invoker: "invokerName",
        //              jqEvent: "click",
        //              selector: "selectorName"
        //          }
        //
        controlBindings: {
        },
        // Invoke once component template is loaded
        invokers: {
            "applyControlBindings": {
                funcName: "sjrk.controlBinder.applyControlBindings",
                args: "{that}"
            }
        }
    });

    sjrk.controlBinder.applyControlBindings = function (that) {
        fluid.each(that.options.controlBindings, function (record, key) {

            var control, invoker, jqEvent, selector;

            // Determine short or long form
            if(typeof(record) === "string") {
                selector = key;
                invoker = record;
                jqEvent = "click";
            }

            if(typeof(record) === "object") {
                selector = record.selector;
                invoker = record.invoker;
                jqEvent = record.jqEvent;
            }

            control = that.locate(selector);

            control[jqEvent](function (e) {
                that[invoker]();
                e.preventDefault();
            });

        });
    };

    fluid.defaults("sjrk.controlBinder.example", {
        gradeNames: ["sjrk.controlBinder"],
        selectors: {
            sayHello: ".sjrkc-controlBinder-example-helloButton",
            sayGoodbye: ".sjrkc-controlBinder-example-goodbyeButton",
            sayHover: ".sjrkc-controlBinder-example-hoverButton"
        },
        controlBindings: {
            sayHello: "sayHelloInv",
            sayGoodbye: "sayGoodbyeInv",
            hoverIn: {
                invoker: "sayHoverInInv",
                jqEvent: "mouseover",
                selector: "sayHover"
            },
            hoverOut: {
                invoker: "sayHoverOutInv",
                jqEvent: "mouseout",
                selector: "sayHover"
            }
        },
        listeners: {
            "onCreate.appendTemplate": {
                "this": "{that}.container",
                "method": "append",
                "args": ["<button class='sjrkc-controlBinder-example-helloButton'>Say Hello</button><button class='sjrkc-controlBinder-example-goodbyeButton'>Say Goodbye</button><button class='sjrkc-controlBinder-example-hoverButton'>Hover Here!</button>"]
            },
            "onCreate.applyControlBindings": {
                "func": "{that}.applyControlBindings",
                priority: "after:appendTemplate"
            }
        },
        invokers: {
            sayHelloInv: {
                funcName: "sjrk.controlBinder.example.consoleMessage",
                args: ["Hello, World!"]
            },
            sayGoodbyeInv: {
                funcName: "sjrk.controlBinder.example.consoleMessage",
                args: ["Goodbye, World!"]
            },
            sayHoverInInv: {
                funcName: "sjrk.controlBinder.example.consoleMessage",
                args: ["Hover in!"]
            },
            sayHoverOutInv: {
                funcName: "sjrk.controlBinder.example.consoleMessage",
                args: ["Hover out!"]
            }
        }
    });

    sjrk.controlBinder.example.consoleMessage = function (consoleMessage) {
        console.log(consoleMessage);
    };

})(jQuery, fluid);
