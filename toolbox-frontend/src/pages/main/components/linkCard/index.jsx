import { useNavigate } from "react-router"
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function LinkCard({ path, title, desc, icon }) {
    const nav = useNavigate()
    return (
        <Card key={path} sx={{ minWidth: 275, maxWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ display: "flex", alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
                    {
                        icon
                    }
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" onClick={() => {
                    nav(path)
                }} >Go To</Button>
            </CardActions>
        </Card>
    )
}