function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
        let arg = String(arguments[i]);

        // Escape special characters in the substitution.
        s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Don't escape special characters in the template.
        s += templateData[i];
    }
    return s;
}

Vue.component('todo-item', {
    props: ['todo'],
    methods: {
        move: function (event) {
            //runEvent
            if (!this.todo.toggle) {
                let remove_r_index = run.List.findIndex(val => {
                    if(val.id === this.todo.id) {
                        val.text = SaferHTML`${this.$refs.area.innerText}`;
                    }
                    return val.id === this.todo.id;
                });
                if(remove_r_index !== -1) {
                    run.List.splice(remove_r_index, 1);
                    finish.List.push(this.todo);
                }
            }
            //finishEvent
            else{
                let remove_f_index = finish.List.findIndex(val =>{
                    if(val.id === this.todo.id) {
                        val.text = SaferHTML`${this.$refs.area.innerText}`;
                    }
                    return val.id === this.todo.id;
                });
                if(remove_f_index !== -1) {
                    finish.List.splice(remove_f_index, 1);
                    run.List.push(this.todo);
                }
            }
        },
    },
    template: `
            <li>
                <div class="li-leftbox">
                    <input type="checkbox" name="now" v-model="todo.toggle" v-on:click="move">
                    <div contenteditable="true" class="textarea" ref="area" ><pre>{{ todo.text }}</pre></div>
                </div>
                <i v-on:click="$emit('remove')"></i>
            </li>
        `
});

var run = new Vue({
    el: '#running',
    data: {
        List: [
            { id: 1, text: "跑步", toggle: false},
            { id: 2, text: "学习", toggle: false},
            ],
    },
    computed: {
        count: function(){
            return this.List.length;
        }
    }
});
var finish = new Vue({
    el: '#finish',
    data: {
        List: [],
    },
    computed: {
        count: function(){
            return this.List.length;
        }
    }
});
var header = new Vue({
    el: '#header',
    data: {
        placeholder: '添加ToDo',
        text: '',
        TipText: '请输入字段',
        todo_id: run.List.length,
    },
    methods: {
        addNewToDo: function(event){
            if(this.text.length){
                run.List.push({
                    id: ++(this.todo_id),
                    text: SaferHTML`${this.text}` ,
                    toggle: false,
                });
                this.text = '';
            }
            else this.$refs.add.setCustomValidity('内容不能为空');
        }
    }
});
header.addNewToDo();