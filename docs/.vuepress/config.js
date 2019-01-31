/**
 * Created by Neil
 * 2019-01-31 17:15
 */
module.exports = {
    title: 'magic UI',
    base:'My-JS-Component',
    description: '一个简洁的原生JS组件库',
    themeConfig:{
        sidebar: [
            '/install/',
            {
                title: '组件',
                children: [
                    '/components/button',
                    '/components/collapse',
                    '/components/tabs',
                    '/components/popover',
                    '/components/nav',
                    '/components/toast',
                    '/components/cascader',
                    '/components/calendar',
                    '/components/carousel',
                    '/components/sticky',
                    '/components/countdown'
                ]
            },
        ]
    }
}
