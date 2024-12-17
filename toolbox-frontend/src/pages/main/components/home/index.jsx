import { NavLink, Outlet, useLocation, useNavigate, useOutletContext } from "react-router";
import { getAllFeatureAndTool } from "../../../../utils/RouteUtils";
import { Typography } from "@mui/material";
import LinkCard from "../linkCard";
import { Padding } from "@mui/icons-material";

// tools 拥有二级目录，也就是可以给 tool 分类
// 1. 路由到具体 tool 时，只显示 tool 工具页面，否则展示其下所有 tool 
export default function HomePage() {
    function autoGenToolsDisplay() {
        const data = getAllFeatureAndTool()
        return (
            <div style={{ padding: '20px' }}>
                <Typography variant="h3">Features</Typography>
                <br />
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {
                        data.features.map(feature => {
                            return <LinkCard key={feature.path} {...feature} />
                        })
                    }
                </div>
                <br />
                <Typography variant="h3">Tools</Typography>
                <br />
                <div style={{ display: "flex", gap: "20px", flexDirection: 'column' }}>
                    {
                        data.toolGroups.map(toolGroup => {
                            return (
                                <div key={toolGroup.title}>
                                    <Typography variant="h5">{toolGroup.title}</Typography>
                                    <br />
                                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                                        {
                                            toolGroup.tools.map(tool => {
                                                return <LinkCard key={tool.path} {...tool} />
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        )
    }



    return (
        <div>
            {
                autoGenToolsDisplay()
            }
        </div>
    )
}