import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import clsx from "clsx"
import styles from "../index.module.css"
import { Storage } from '@mui/icons-material'
export default function Disk() {
    return (
        <>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardHeader avatar={<Storage />} title={
                        <Typography variant='h6'>Disk</Typography>
                    } />
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            SSD random read <span style={{ color: "#EB5B00" }}>16μs</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Read 1MB sequentially from memory <span style={{ color: "#EB5B00" }}>3μs</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Disk seek <span style={{ color: "red" }}>2ms</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Read 1MB sequentially from disk <span style={{ color: "red" }}>825μs</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}