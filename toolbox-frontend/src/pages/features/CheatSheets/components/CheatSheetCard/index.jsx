import styles from './cheatsheetCard.module.css'
import clsx from 'clsx'
import Highlight from 'react-highlight'
import { Typography } from '@mui/material'
import { Code, DeleteOutline, Fullscreen } from '@mui/icons-material'
import { useState } from 'react'
/**
 * title
 * tags: [tag1, tag2, tag3.....]
 * content: custom image or syntax text
 * language
 * type: image(full custome) | text
 * @returns 
 */
export default function CheatSheetCard(
    { id, title = 'default', tags = [], content = 'default', language, type, onDelete }
) {

    const [isFullScreen, setIsFullScreen] = useState(false)

    return (
        <>
            <div className={clsx(isFullScreen ? styles.cardContainerBig : styles.cardContainer)}>
                <div className={clsx(styles.cardTitle)}>
                    <Typography variant='h6'>{title}</Typography>
                    <div className={clsx(styles.cardTools)}>
                        <DeleteOutline style={{ cursor: 'pointer' }} onClick={() => onDelete(title, id)} />
                        <Fullscreen style={{ cursor: 'pointer' }} onClick={() => setIsFullScreen(!isFullScreen)} />
                        <Typography variant='subtitle2'>{language}</Typography>
                    </div>
                </div>
                <div>
                    {
                        type == '0' ?
                            <img className={clsx(isFullScreen ? styles.cardImageBig : styles.cardImage)} src={content} /> :
                            <Highlight className={clsx(isFullScreen ? styles.codeFontBig : styles.codeFont, language)}>{content}</Highlight>
                    }
                </div>
            </div>
        </>
    )
}