import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import clsx from "clsx"
import styles from "../index.module.css"
import { Bolt } from '@mui/icons-material'
export default function MainMemory() {
    return (
        <>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardHeader avatar={<Bolt />} title={
                        <Typography variant='h6'>Main Memory</Typography>
                    } />
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Main Memory Reference <span style={{ color: 'blue' }}>100ns</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Compress 1KB with Zippy <span style={{ color: 'blue' }}>2,000ns ≈ 2μs</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}