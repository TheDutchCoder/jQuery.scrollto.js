jQuery.scrollto.js
==============

A jQuery plugin that lets the author scroll to any object, from any trigger.

## Installation
Download the plugin file and put it wherever you like.
Simply reference it in your HTML like so:

```html
<script type="text/javascript" src="[path-to-your-scripts]/jQuery.scrollto.js"></script>
```

## Markup (HTML)
The plugin requires a `trigger` and a `target`, all other settings are optional.

### Trigger
The `trigger` can be virtually anything, but I recommend using either navigational links (`a`) or a `<button>` element.

```html
<button type="button" class="js-scrollto">Scroll down</button>
```

### Target
The `target` can be any valid jQuery selector or, if left blank, the plugin will asume an anchor is supplied (E.g. `href="#details"`).
