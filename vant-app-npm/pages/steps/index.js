import createPage from "vant-aliapp/dist/common/page";
createPage({
    data: {
        active: 0,
        steps: [
            {
                text: "步骤一",
                desc: "描述信息"
            },
            {
                text: "步骤二",
                desc: "描述信息"
            },
            {
                text: "步骤三",
                desc: "描述信息"
            },
            {
                text: "步骤四",
                desc: "描述信息"
            }
        ]
    },

    nextStep() {
        this.setData({
            active: ++this.data.active % 4
        });
    }
});
