import createPage from '../../common/page';

createPage({
  data: {
    radio1: '1',
    radio2: '2',
    radio3: '1',
    icon: {
      normal:
        'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
      active:
        'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
    },
    list: ['1', '2', '3', '4']
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio3: name
    });
  }
});
