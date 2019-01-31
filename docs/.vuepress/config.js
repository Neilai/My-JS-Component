/**
 * Created by Neil
 * 2019-01-31 17:15
 */
module.exports = {
    title: 'Hello VuePrs',
    description: 'Just playing around',
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
                    '/components/carousel'
                ]
            },
        ]
    }
}
