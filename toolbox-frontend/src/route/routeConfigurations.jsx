import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Main from "../pages/main";
import FeatureReoutPage from "../pages/main/components/feature";
import ToolRoutePage from "../pages/main/components/tool";
import CheatSheets from "../pages/features/CheatSheets";
import ToolParentPage from "../pages/main/components/toolParentRoute";
import HomePage from "../pages/main/components/home";
import EnvelopEstimation from "../pages/tools/EnvelopEstimation";
import { Quiz } from "@mui/icons-material";
import T1 from "../pages/tools/T1";
import T2 from "../pages/tools/T2";
import T3 from "../pages/tools/T3";
import T4 from "../pages/tools/T4";

import { Home, StickyNote2, QrCode2, Celebration, CurrencyExchange, Spellcheck, Calculate, Functions, MonitorHeart } from "@mui/icons-material";
import ExchangeRate from "../pages/tools/ExchangeRate";
import LeetCodePanel from "../pages/features/LeetCodePanel";
import LifeEntropy from "@/src/pages/features/LifeEntropy/index.jsx";

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
                        path: 'lifeEntropy',
                        icon: <MonitorHeart />,
                        title: 'LifeEntropy',
                        desc: 'xxxxxxxxxx',
                        element: <LifeEntropy />
                    },
                    {
                        path: 'cheatsheets',
                        icon: <StickyNote2 />,
                        title: 'Cheat Sheets',
                        desc: 'xxxxxxxxxx',
                        element: <CheatSheets />
                    },
                    {
                        path: 'leetcode',
                        icon: <Quiz />,
                        title: 'LeetCode',
                        desc: 'LeetCode Management Panel',
                        element: <LeetCodePanel />
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
                        icon: <Spellcheck />,
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
                    {
                        path: 'calculator',
                        element: <ToolParentPage />,
                        icon: <Calculate />,
                        title: 'Calculator',
                        children: [
                            {
                                path: 'enveplopestimation',
                                icon: <Functions />,
                                title: 'Envelop Estimatio',
                                desc: 'Back Of the Envelop Estimation',
                                element: <EnvelopEstimation />
                            }
                        ]
                    },
                    {
                        path: 'fun',
                        element: <ToolParentPage />,
                        icon: <Celebration />,
                        title: 'Fun',
                        children: [
                            {
                                path: 'exchangerate',
                                icon: <CurrencyExchange />,
                                title: 'Exchange Rate',
                                desc: 'Currency Exchange Rate',
                                element: <ExchangeRate />
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export default routeConfigurations