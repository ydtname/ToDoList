var A = {
    template: `
            <div class="demo-alert-box1">
              <strong>Error!</strong>
              <slot>456</slot>
            </div>
        `
};

var B ={
    components: {
        'alert-box1': A
    },
    template: `
            <div class="demo-alert-box2">
              <strong>Error!</strong>
              <slot>123</slot>
              <alert-box1></alert-box1>
            </div>
        `
};

new Vue({
    el: '#a',
    data: {
        searchText: ''
    },
    components: {
        'alert-box2': B
    }
});
