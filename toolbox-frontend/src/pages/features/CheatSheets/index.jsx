import CheatSheetCard from "./components/CheatSheetCard"
import clsx from "clsx"
import styles from './index.module.css'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Chip, Stack, TextField, InputAdornment, Input, checkboxClasses, Button, Drawer } from "@mui/material"
import { Add, Draw, Search } from '@mui/icons-material'
import AddForm from "./components/AddForm"
import TagIcon from '@mui/icons-material/Tag'
import { useAlert, useDialog } from "../../../utils/AlertUtils"
import { debounce, sendHttp } from "../../../utils/ToolUtils"
import useRefresh from "../../../utils/useRefresh"

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { PostAdd } from '@mui/icons-material';
import DirectionsIcon from '@mui/icons-material/Directions';


export default function CheatSheets() {
    const [refreshStatus, refresh] = useRefresh()
    const [searchTitle, setSearchTitle] = useState('')
    const [selectedTag, setSelectedTag] = useState({ title: 'All' })
    const [tagSource, setTagSource] = useState([])
    const [cheatsheets, setCheatSheets] = useState([])

    const tags = useMemo(
        () => {
            return [
                { title: 'All', isActive: selectedTag.title == 'All' },
                ...tagSource.map(item => {
                    return {
                        title: item,
                        isActive: selectedTag.title == item
                    }
                })
            ]
        }, [tagSource, selectedTag])


    const [addIsOpened, setAddIsOpened] = useState(false)

    const { alertSuccess, alertError } = useAlert()
    const dialogTo = useDialog()

    useEffect(() => {
        handleQuery()
    }, [refreshStatus, selectedTag, searchTitle])


    function handleQuery() {
        sendHttp('query', [{ title: searchTitle.trim(), tag: selectedTag.title.trim() == 'All' ? '' : selectedTag.title.trim() }], (data) => {
            setCheatSheets(data.data.list)
            setTagSource(data.data.tags)
            alertSuccess(data.msg)
        }, (data) => {
            alertError(data.msg)
        })
    }
    function handleClickTag(tag) {
        setSelectedTag(tag)
        refresh()
    }

    function handleSearch(value) {
        setSearchTitle(value)
        refresh()
    }

    // Add 
    function handleAddCheatsheet(title, language, tags, filePath, type) {
        setAddIsOpened(false)
        sendHttp('insertOne', [
            {
                title,
                language,
                tags: tags.join(),
                filePath,
                type
            }
        ], (data) => {
            alertSuccess(data.msg)
            refresh()
        }, (data) => {
            alertError(data.msg)
        })
    }

    // Delete 
    function handleDelete(title, id) {
        dialogTo('Tip', `请确定是否删除 ${title} 备忘录.`, () => {
            sendHttp('deleteOne', [id], (data) => {
                alertSuccess(data.msg)
                refresh()
            }, (data) => {
                alertError(data.msg)
            })
        })

    }


    return (
        <>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.searchContainer)}>
                    <Paper
                        component="form"
                        sx={{ p: '5px 10px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            onChange={e => handleSearch(e.target.value)}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Google Maps"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => setAddIsOpened(!addIsOpened)}>
                            <PostAdd />
                        </IconButton>
                    </Paper>
                </div>

                <Drawer
                    anchor="right"
                    open={addIsOpened}
                    onClose={() => setAddIsOpened(false)}
                >
                    {<AddForm onSubmit={handleAddCheatsheet} tags={tags.map(item => item.title).filter(item => item != 'All')} />}
                </Drawer>


                <div className={clsx(styles.filterContainer)}>
                    {
                        tags.map(item => (
                            <Chip
                                key={item.title}
                                label={item.title}
                                color="primary"
                                icon={<TagIcon />}
                                variant={item.isActive ? 'fill' : 'outlined'}
                                onClick={() => { handleClickTag(item) }}
                            />
                        ))
                    }
                </div>

                <div className={clsx(styles.cardContainer)}>
                    {
                        cheatsheets.map(item => <CheatSheetCard key={item.id} {...item} onDelete={handleDelete} onClickTag={setSelectedTag} />)
                    }
                </div>

            </div >
        </>
    )
}