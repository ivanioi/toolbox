import { NavLink, Outlet, useLocation, useNavigate, useOutletContext } from "react-router";
import { getAllSubTool, isToolsPage } from "../../../../utils/RouteUtils";
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LinkCard from "../linkCard";

// tools 拥有二级目录，也就是可以给 tool 分类
// 1. 路由到具体 tool 时，只显示 tool 工具页面，否则展示其下所有 tool 
export default function ToolParentRoutePage() {
    let location = useLocation();
    const nav = useNavigate()

    function autoGenToolsDisplay() {
        const data = getAllSubTool(location.pathname)

        return (
            <div>
                <Typography variant="h3">{data.title}</Typography>
                <br />
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {
                        data.tools.map(tool => {
                            return (
                                <LinkCard key={tool.path} {...tool} />
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
                isToolsPage(location) ? autoGenToolsDisplay() : <Outlet />
            }
        </div>
    )
}