import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Autocomplete, Input, TextField, Chip, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { removeDuplicates4array } from '../../../../../utils/ArrayUtils';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.css'
import { useAlert } from '../../../../../utils/AlertUtils';
import { Api } from '../../../../../api/Api';
import { ThumbUp, Image, Description, Add, Delete } from '@mui/icons-material';

export default function AddForm({ onSubmit, tags = [] }) {

    const [titleField, setTitleField] = useState('')
    const [titleFieldIsValid, setTitleFieldIsValid] = useState(true)
    const [languageField, setLanguageField] = useState('')
    const [tagsField, setTagsField] = useState([])
    const [filePathField, setFilePathField] = useState(null)
    const [fileType, setFileType] = useState(1);
    const [content, setContent] = useState();
    const [fileUploadSuccess, setFileUploadSuccess] = useState(false)
    const [links, setLinks] = useState([{ id: Number.parseInt(Math.random() * 100), name: '', link: '' }])

    const fileAPI = new Api().fileUpload;
    const { alertSuccess, alertWarning, alertError } = useAlert()
    function handleSubmit() {
        if (titleField != '' && languageField != '' && tagsField.length != 0) {
            if (fileType == '0' && !filePathField) {
                alertWarning('请上传图片.')
                return;
            }
            onSubmit(titleField, languageField, tagsField, filePathField, fileType, content, genLinks())
        } else {
            alertWarning('请输入所有字段')
        }
    }

    function genLinks() {
        let validLinks = links.filter(l => l.name != '' && l.link != '');
        return validLinks.length != 0 ? validLinks.reduce((p, c) => p + "," + c.name + "@!@" + c.link, "").substring(1) : null;
    }

    function handleFileUpload(moduleName, files) {
        if (files.length == 0) return;
        let formData = new FormData();
        formData.append('file', files[0], files[0].name)
        fileAPI.uploadFile({ feature: moduleName }, formData).then(({ data }) => {
            if (data.success == '1') {
                alertSuccess('success', '文件上传成功.')
                setFilePathField(data.data)
                setFileUploadSuccess(true)
            } else {
                alertError('error', data.msg)
            }
        })
    }

    function handleUpdateLink(id, name, link) {
        setLinks(links.map(itm => {
            if (itm.id == id) return { id, name, link }
            return itm;
        }))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.topContainer)}>
                <TextField
                    error={!titleFieldIsValid}
                    label="Title"
                    defaultValue="CheatSheet Title"
                    helperText="Can't be empty."
                    variant="standard"
                    onChange={(evt) => {
                        evt.target.value == '' ? setTitleFieldIsValid(false) : setTitleFieldIsValid(true)
                        setTitleField(evt.target.value)
                    }}
                />


                <TextField label="Language" onChange={(evt) => setLanguageField(evt.target.value)} />



                <Autocomplete
                    multiple
                    options={tags}
                    freeSolo
                    onChange={(evt, val) => {
                        setTagsField(removeDuplicates4array(val))
                    }}
                    renderTags={(value, getTagProps) => {
                        value = removeDuplicates4array(value)
                        return value.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip variant="outlined" label={option} key={key} {...tagProps} />
                            );
                        })
                    }
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tag"
                        />
                    )}
                />

                <Typography sx={{ marginBottom: -3 }}>Links</Typography>
                {
                    links.map(itm => {
                        return (
                            <OutlinedInput
                                key={itm.id}
                                variant="outlined"
                                onChange={(evt) => handleUpdateLink(itm.id, itm.name, evt.target.value)}
                                startAdornment={
                                    <Input
                                        onChange={(evt) => handleUpdateLink(itm.id, evt.target.value, itm.link)}
                                    />
                                }
                                endAdornment={
                                    <div>
                                        <IconButton>
                                            <Add onClick={() => setLinks([...links, { id: Number.parseInt(Math.random() * 100), name: '', link: '' }])} />
                                        </IconButton>

                                        <IconButton>
                                            <Delete onClick={() => {
                                                setLinks(links.filter(l => l.id != itm.id))
                                            }
                                            } />
                                        </IconButton>
                                    </div>
                                }
                            />
                        )
                    })
                }

                <FormControl>
                    <FormLabel >File Type</FormLabel>
                    <RadioGroup
                        row
                        value={fileType}
                        onChange={(event) => {
                            setFileType(event.target.value)
                            setFileUploadSuccess(false);
                            setFilePathField('')
                        }}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="Image" />
                        <FormControlLabel value="1" control={<Radio />} label="Text" />
                    </RadioGroup>
                </FormControl>
                {
                    fileType == '0' ? (
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            color='secondary'
                            size='large'
                            tabIndex={-1}
                            startIcon={fileUploadSuccess ? (fileType == '1' ? <Description /> : <Image />) : <CloudUploadIcon />}
                        >
                            {fileUploadSuccess ? "Upload Success" : "Upload CheatSheet"}
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                onChange={(event) => handleFileUpload('cheatsheet', event.target.files)}
                                accept='text/*,image/*'
                            />
                        </Button>
                    ) : (
                        <TextField
                            label='text'
                            multiline
                            minRows={12}
                            maxRows={15}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    )
                }
                <Button
                    variant="contained" size='large' onClick={handleSubmit} >提交</Button>
            </div>
            <div className={clsx(styles.bottomContainer)}>

            </div>
        </div>
    )
}