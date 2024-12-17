import routeConfigurations from "../route/routeConfigurations"
export function isToolsPage(location) {
    return location.pathname.startsWith('/tools') && location.pathname.split('/').length == 3
}

export function isToolPage(location) {
    return location.pathname.startsWith('/tools') && location.pathname.split('/').length == 4
}

/**
 * 根据 tool分组路由路径，返回其下所有工具路由路径
 * @param {} path tool 分类路由, 如 /tools/encode
 * @returns
 */
export function getAllSubTool(path) {
    const [homeRoute, featuresRoute, toolsRoute] = routeConfigurations[0].children;

    const result = { tools: [], title: '' }
    for (let i = 0; i < toolsRoute.children.length; i++) {
        const toolGroup = toolsRoute.children[i]
        const tools = toolsRoute.children[i].children

        if ('/tools/' + toolGroup.path == path) {
            result.title = toolGroup.title
            result.tools = tools.map(tool => ({
                path: '/tools/' + toolGroup.path + "/" + tool.path,
                title: tool.title,
                desc: tool.desc,
                icon: tool.icon
            }))
        }
    }

    return result

}

export function getAllFeatureAndTool() {
    const [homeRoute, featuresRoute, toolsRoute] = routeConfigurations[0].children;
    const result = { toolGroups: [], features: [] }

    for (let i = 0; i < featuresRoute.children.length; i++) {
        const feature = featuresRoute.children[i];
        result.features.push({
            path: '/features/' + feature.path,
            title: feature.title,
            desc: feature?.desc,
            icon: feature.icon
        })
    }

    for (let i = 0; i < toolsRoute.children.length; i++) {
        const toolGroup = toolsRoute.children[i]
        const tools = toolsRoute.children[i].children
        result.toolGroups.push({
            title: toolGroup.title,
            'tools': tools.map(tool => ({
                path: '/tools/' + toolGroup.path + "/" + tool.path,
                title: tool.title,
                desc: tool.desc,
                icon: tool.icon
            }))
        })
    }

    return result;

}

export function genMenuConfig() {
    const [homeRoute, featuresRoute, toolsRoute] = routeConfigurations[0].children;

    let menuItems = [];

    menuItems.push({
        id: homeRoute.path,
        label: homeRoute.title,
        path: homeRoute.path,
        icon: homeRoute.icon
    })

    for (let i = 0; i < featuresRoute.children.length; i++) {
        const feature = featuresRoute.children[i]
        menuItems.push({
            id: feature.path,
            label: feature.title,
            path: '/features/' + feature.path,
            icon: feature.icon
        })
    }

    for (let i = 0; i < toolsRoute.children.length; i++) {
        const toolGroup = toolsRoute.children[i]
        const tools = toolsRoute.children[i].children

        menuItems.push({
            id: toolGroup.path,
            label: toolGroup.title,
            path: '/tools/' + toolGroup.path,
            icon: toolGroup.icon,
            children: tools.map(tool => {
                return {
                    id: tool.path,
                    label: tool.title,
                    path: '/tools/' + toolGroup.path + "/" + tool.path,
                    icon: tool.icon
                }
            })
        })
    }

    return menuItems;
}