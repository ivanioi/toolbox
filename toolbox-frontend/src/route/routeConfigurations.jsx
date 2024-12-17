import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "../pages/main";
import FeatureReoutPage from "../pages/main/components/feature";
import ToolRoutePage from "../pages/main/components/tool";
import CheatSheets from "../pages/features/CheatSheets";
import ToolParentPage from "../pages/main/components/toolParentRoute";
import HomePage from "../pages/main/components/home";
import T1 from "../pages/tools/T1";
import T2 from "../pages/tools/T2";
import T3 from "../pages/tools/T3";
import T4 from "../pages/tools/T4";

import { Home, StickyNote2, QrCode2 } from "@mui/icons-material";

// features 不支持目录分类
// tools 只支持二级目录

const routeConfigurations = [
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'home',
                title: 'Home',
                icon: <Home />,
                element: <HomePage />,
                children: []
            },
            {
                path: 'features',
                element: <FeatureReoutPage />,
                children: [
                    {
                        path: 'cheatsheets',
                        icon: <StickyNote2 />,
                        title: 'Cheat Sheets',
                        desc: 'xxxxxxxxxx',
                        element: <CheatSheets />
                    }
                ]
            },
            {
                path: 'tools',
                element: <ToolRoutePage />,
                children: [
                    {
                        path: 'encode',
                        element: <ToolParentPage />,
                        icon: <QrCode2 />,
                        title: 'Encode / Decode',
                        children: [
                            {
                                path: 't1',
                                icon: <Home />,
                                title: 'Tool #1',
                                desc: 'xxxxxxxxxx',
                                element: <T1 />
                            },
                            {
                                path: 't2',
                                icon: <Home />,
                                title: 'Tool #2',
                                desc: 'xxxxxxxxxx',
                                element: <T2 />
                            },
                        ]
                    },
                    {
                        path: 'text',
                        element: <ToolParentPage />,
                        icon: <Home />,
                        title: 'Text',
                        children: [
                            {
                                path: 't3',
                                icon: <Home />,
                                title: 'Tool #3',
                                desc: 'xxxxxxxxxx',
                                element: <T3 />
                            },
                            {
                                path: 't4',
                                icon: <Home />,
                                title: 'Tool #4',
                                desc: 'xxxxxxxxxx',
                                element: <T4 />
                            },
                        ]
                    },
                ]
            }
        ]
    }
]

export default routeConfigurations