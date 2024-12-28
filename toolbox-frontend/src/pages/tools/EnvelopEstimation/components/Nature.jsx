import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import clsx from "clsx"
import styles from "../index.module.css"
import { WaterDrop } from '@mui/icons-material'
export default function Nature() {
    return (
        <>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardHeader avatar={<WaterDrop />} title={
                        <Typography variant='h6'>Earth</Typography>
                    } />
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            The speed of light <span style={{ color: '#F05A7E' }}>300,000km/s</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            The speed of electric current <span style={{ color: '#F05A7E' }}>270,000km/s</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}