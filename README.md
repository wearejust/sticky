# Sticky

### Installation
```
npm install @wearejust/sticky --save
```

### Usage
```javascript
require('@wearejust/sticky');

$(function() {
    $('.sticky').sticky();
});
```

#### With options
```javascript
require('@wearejust/sticky');

$(function() {
    $('.sticky').sticky({
        active: 'is-active',
        topHeightOffset: 0
    });
});
```