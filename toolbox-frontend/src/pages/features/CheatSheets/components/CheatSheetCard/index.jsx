import styles from './cheatsheetCard.module.css'
import clsx from 'clsx'
import Highlight from 'react-highlight'
import { Typography, Chip, Link } from '@mui/material'
import { Code, DeleteOutline, Fullscreen } from '@mui/icons-material'
import { useState } from 'react'
/**
 * title
 * tags: "tag1,tag2"
 * content: custom image or syntax text
 * language
 * type: image(full custome) | text
 * @returns 
 */
export default function CheatSheetCard(
    { id, title = 'default', tags = "", content = 'default', language, type, onDelete, onClickTag, links = "" }
) {

    const [isFullScreen, setIsFullScreen] = useState(false)
    const linkList = links?.split(",")
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
                <div className={clsx(styles.cardTags)}>
                    {
                        tags.split(",").map(item => {
                            return <Chip color="success" key={item} label={item} variant="outlined" onClick={() => onClickTag({ title: item })} />
                        })
                    }
                </div>
                <div className={clsx(styles.cardTags)}>
                    {
                        linkList?.map(item => {
                            const [name, link] = item.split("@!@")
                            return <Link key={link} href={link} target="_blank" rel="noreferrer" >
                                <Chip color="warning" label={name} variant="outlined">
                                </Chip>
                            </Link>
                        })
                    }
                </div>
                <div className={clsx(styles.contentContainer)}>
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