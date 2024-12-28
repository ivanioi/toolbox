import React, { Fragment, lazy } from 'react'
import clsx from 'clsx'
import styles from './index.module.css'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Memory, Public, Storage, Bolt } from '@mui/icons-material'
import CPU from './components/CPU'
import MainMemory from './components/MainMemory'
import Network from './components/Network'
import Disk from './components/Disk'
import Nature from './components/Nature'
import Calculator from './components/Calculator'

export default function EnvelopEstimation() {
    return (
        <div className={clsx(styles.container)}>
            <div style={{ width: '100%' }}>
                <Calculator />
            </div>
            <div className={clsx(styles.botContainer)}>
                <div className={clsx(styles.botItemContainer)}>
                    <Nature />
                </div>
                <div className={clsx(styles.botItemContainer)}>
                    <CPU />
                </div>
                <div className={clsx(styles.botItemContainer)}>
                    <MainMemory />
                </div>
                <div className={clsx(styles.botItemContainer)}>
                    <Network />
                </div>
                <div className={clsx(styles.botItemContainer)}>
                    <Disk />
                </div>
            </div>
        </div>
    )
}