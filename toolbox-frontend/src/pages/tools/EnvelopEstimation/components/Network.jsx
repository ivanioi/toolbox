import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import clsx from "clsx"
import styles from "../index.module.css"
import { Public } from '@mui/icons-material'
export default function Network() {
    return (
        <>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardHeader avatar={<Public />} title={
                        <Typography variant='h6'>Network</Typography>
                    } />
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Send 2KB over commodity network <span style={{ color: "#A888B5" }}>44ns</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Packet roundtrip in same datacenter <span style={{ color: "#A888B5" }}>500μs</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            Packet roundtrip CA to Netherlands <span style={{ color: "#A888B5" }}>150ms</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}