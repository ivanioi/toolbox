import * as React from 'react'
import { Alert, Dialog, Fade, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material'
import { useGlobalStore } from '../../App'
import { Outlet, useNavigate } from 'react-router'
import { genMenuConfig } from '../../utils/RouteUtils'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';

import styles from './index.module.css'
import clsx from 'clsx'
import CustomMenuLabel from './components/customLabel'
import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import { Menu } from '@mui/icons-material'


const genCustomTreeItem = (isMenuOpen) => {

    return React.forwardRef(function CustomTreeItem(props, ref) {
        const { publicAPI } = useTreeItem2Utils({
            itemId: props.itemId,
            children: props.children,
        });

        const item = publicAPI.getItem(props.itemId);

        return (
            <TreeItem2
                {...props}
                ref={ref}
                slots={{
                    label: CustomMenuLabel
                }}
                slotProps={{
                    content: {
                        sx: { height: '50px', minWidth: isMenuOpen ? '15vw' : '' },
                    },
                    label: {
                        sx: { fontSize: '20px' },
                        icon: item.icon,
                        type: isMenuOpen ? 'open' : 'close'
                    },
                    iconContainer: {
                        sx: { display: isMenuOpen ? '' : 'none' },
                    }
                }}
            />
        );
    })
}


export default function Main() {
    // 全局提示反馈，对话框
    const { alert: { severity, msg, isOpen, shortLived }, closeAlert } = useGlobalStore((state) => state)
    const { dialog: { title: dTitle, msg: dMsg, isOpen: dIsOpen, handleAgree: dHa, handleDisagree: dHda }, closeDialog } = useGlobalStore((state) => state)
    const alertDomRef = React.useRef(null)

    const [isMenuOpen, setIsMenuOpen] = React.useState(true);

    const menuConifg = [{ id: 'menuIcon', label: '', icon: <Menu /> }, ...genMenuConfig()]

    const apiRef = useTreeViewApiRef();

    let navigate = useNavigate()

    function handleClick(evt, itemId) {
        const item = apiRef.current.getItem(itemId)
        apiRef.current
        if (item.id == 'menuIcon') {
            setIsMenuOpen(!isMenuOpen)
        } else if (item.id == 'homeIcon') {

        } else {
            navigate(item.path)
        }
    }
    return (
        <div>
            {/* 全局提示 UI */}
            <div>
                <Dialog
                    maxWidth='lg'
                    open={dIsOpen}
                    onClose={closeDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {dTitle}
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ wordBreak: 'break-word', maxWidth: '45vw', minWidth: '20vw' }}>
                            <Typography variant='body1'>
                                {dMsg}
                            </Typography>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => dHda(closeDialog)}>
                            Disagree
                        </Button>
                        <Button onClick={() => dHa(closeDialog)} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div
                ref={alertDomRef}
                style={{
                    position: 'absolute',
                    top: '50px',
                    left: '35%',
                    zIndex: 999999999
                }}>
                <Fade in={isOpen}>
                    {
                        (() => {
                            if (isOpen && alertDomRef.current) {
                                alertDomRef.current.style.display = ''
                            }

                            if (shortLived) {
                                setTimeout(() => {
                                    if (alertDomRef.current) {
                                        closeAlert()
                                    }
                                }, 2000)
                                return (
                                    <Alert
                                        style={{ minWidth: '500px' }}
                                        severity={severity}
                                    >{msg}</Alert>)
                            } else {
                                return (
                                    <Alert
                                        style={{ minWidth: '500px' }}
                                        severity={severity}
                                        onClose={closeAlert} >{msg}</Alert>)
                            }
                        })()
                    }
                </Fade>

            </div>
            <div className={clsx(styles.rootContainer)}>
                <div className={clsx(styles.left)}>
                    <RichTreeView
                        apiRef={apiRef}
                        items={menuConifg}
                        slots={{ item: genCustomTreeItem(isMenuOpen) }}
                        onItemClick={handleClick}
                        expansionTrigger={isMenuOpen ? 'content' : 'iconContainer'}
                    />
                </div>
                <div className={clsx(styles.right)}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}