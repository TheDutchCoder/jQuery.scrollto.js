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
The plugin requires only a `trigger` and a `target`.

### Trigger
The `trigger` can be virtually anything, but I recommend some sort of navigational menu (like a `ul` element), or using something like a `<button>` element.

```html
<!-- Menu example -->
<ul class="menu">
  <li><a href="#books">Books</a></li>
  <li><a href="#movies">Movies</a></li>
  <li><a href="#shows">Shows</a></li>
</ul>

<!-- Button example -->
<button type="button" class="js-scrollto">Scroll down</button>
```

### Target
The `target` can be any valid jQuery selector or, if left blank, the plugin will try to use the `trigger`'s anchor (E.g. `<a href="#details">Details</a>`).

```html
<!-- Target example -->
<h1 id="books">Books</h1>
<p>A wide selection of reading materials.</p>
```

## JavaScript
With the markup in place, you can call the plugin from within jQuery like so:

```js
$(document).ready(function() {
    
    // This will use the anchor's href attribute to scroll to.
    $('.menu a').scrollto();

    // Or you can configure a custom trigger.
    $('.js-scrollto').scrollto({
      target: '#books'
    });
    
});
```

You probably want more control over this pugin, so here's a full list of options you can configure:

```js
$('.menu').scrollto({
  trigger: 'a',
  target: '#books',
  namespace: 'my_namespace',
  speed: 500,
  preventDefault: false,
  stopPropagation: true
});
```

### trigger
This is a (sub) element which will trigger the actual scrolling. So for example, if you attach this plugin to the entire document, you can then specify which element(s) should trigger scrolling behaviour.

```js
// The plugin is attached to the menu, but the links within the menu are the
// actual triggers.
$('.menu').scrollto({
  trigger: 'a'
});
```

### target
A custom target to scroll to. This will be used for all the elements that this plugin instance is bound to. So you probably want to use this on a single case basis.
```js
// With a specific target, ALL links will go scroll to that target. This is
// something you probably don't want in most cases.
$('.menu a').scrollto({
  target: '#books'
});
```

### namespace
All events in this plugin are handled in their own namespace. You don't have to do anything with this setting, but it can be useful for advanced users. The default namespace is `jQuery_scrollto`.
```js
// This plugin uses a namepsace for events, so if you need to do something with
// the events in this plugin, you can interact with them through this namespace.
$('.menu a').scrollto({
  namespace: 'my_namespace'
});
```

### speed
The speed at which to scroll to the target (in milliseconds).
```js
// This will cause any scroll to take 500ms.
$('.menu a').scrollto({
  speed: 500
});
```

### preventDefault
By default, this setting is enabled, in order to prevent links to jump to the anchor, instead of scrolling. You normally don't need to change this setting.
```js
// This will enable the default behaviour of an element. You'd probably not use
// this in most cases.
$('.menu a').scrollto({
  preventDefault: false
});
```

### stopPropagation
USE WITH CAUTION! Enabling this setting will cause all events to stop from bubbling up. Only use this setting if you're fully aware of the consequences (it's normally not needed).
```js
// All event bubbling is stopped, if you really need it to.
$('.menu a').scrollto({
  stopPropagation: true
});
```
