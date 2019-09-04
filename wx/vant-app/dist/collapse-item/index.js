import { VantComponent } from '../common/component';
const nextTick = () => new Promise(resolve => setTimeout(resolve, 20));
VantComponent({
    classes: ['title-class', 'content-class'],
    relation: {
        name: 'collapse',
        type: 'ancestor',
        linked(parent) {
            this.parent = parent;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        }
    },
    data: {
        contentHeight: 0,
        expanded: false,
        transition: false,
        itemId: 0
    },
    mounted() {
        this.updateExpanded()
            .then(nextTick)
            .then(() => {
            const data = { transition: true };
            if (this.data.expanded) {
                data.contentHeight = 'auto';
            }
            this.set(data);
        });
    },
    methods: {
        updateExpanded() {
            if (!this.parent) {
                return Promise.resolve();
            }
            const { value, accordion } = this.parent.data;
            const { children = [] } = this.parent;
            const { name } = this.data;
            const index = children.indexOf(this);
            const currentName = name == null ? index : name;
            const expanded = accordion
                ? value === currentName
                : (value || []).some((name) => name === currentName);
            const stack = [];
            if (expanded !== this.data.expanded) {
                stack.push(this.updateStyle(expanded));
            }
            stack.push(this.set({ index, expanded }));
            return Promise.all(stack);
        },
        updateStyle(expanded) {
          let randomStr = Number(new Date())
          this.setData({
            itemId: randomStr
          })
          return this.getRect(".van-collapse-item__content_" + randomStr)
                .then((rect) => {
                  console.log('style', rect)
                  return rect.height
                  })
                .then((height) => {
                if (expanded) {
                    return this.set({
                        contentHeight: height ? `${height}px` : 'auto'
                    });
                }
                return this.set({ contentHeight: `${height}px` })
                    .then(nextTick)
                    .then(() => this.set({ contentHeight: 0 }));
            });
        },
        onClick() {
            if (this.data.disabled) {
                return;
            }
            const { name, expanded } = this.data;
            const index = this.parent.children.indexOf(this);
            const currentName = name == null ? index : name;
            this.parent.switch(currentName, !expanded);
        },
        onTransitionEnd() {
            if (this.data.expanded) {
                this.set({
                    contentHeight: 'auto'
                });
            }
        }
    }
});