import { Card, Link, CardHeader, CardContent, Typography } from '@mui/material'
import clsx from "clsx"
import styles from "../index.module.css"
import { Memory } from '@mui/icons-material'
import { useDialog } from '../../../../utils/AlertUtils'
export default function CPU() {
    const toDialog = useDialog();

    function handleCPI() {
        toDialog("CPI",
            (
                <>
                    <Link href="https://en.wikipedia.org/wiki/Cycles_per_instruction#">Check CPI Wiki!</Link>
                </>
            ),
            null, null, false
        )
    }
    return (
        <>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardHeader avatar={<Memory />} title={
                        <Typography variant='h6'>CPU</Typography>
                    } />
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            L1 cache reference <span style={{ color: 'green' }}>1ns</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            L2 cache reference <span style={{ color: 'green' }}>4ns</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card>
                    <CardContent>
                        <Typography variant='body1'>
                            L3 Size(Intel 14th) <span style={{ color: 'green' }}>36MB</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className={clsx(styles.botItem)}>
                <Card onClick={handleCPI}>
                    <CardContent>
                        <Typography variant='body1'>
                            Cycles per instruction(MIPS) <span style={{ color: 'green' }}>4</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}