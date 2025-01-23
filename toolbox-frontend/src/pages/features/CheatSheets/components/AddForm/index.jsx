import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Autocomplete, Input, TextField, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { removeDuplicates4array } from '../../../../../utils/ArrayUtils';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.css'
import { useAlert } from '../../../../../utils/AlertUtils';
import { Api } from '../../../../../api/Api';
import { ThumbUp, Image, Description } from '@mui/icons-material';

export default function AddForm({ onSubmit, tags = [] }) {

    const [titleField, setTitleField] = useState('')
    const [titleFieldIsValid, setTitleFieldIsValid] = useState(true)
    const [languageField, setLanguageField] = useState('')
    const [tagsField, setTagsField] = useState([])
    const [filePathField, setFilePathField] = useState(null)
    const [fileType, setFileType] = useState(1);
    const [fileUploadSuccess, setFileUploadSuccess] = useState(false)

    const { alertSuccess, alertWarning, alertError } = useAlert()
    function handleSubmit() {
        if (titleField != '' && languageField != '' && tagsField.length != 0 && filePathField != null) {
            onSubmit(titleField, languageField, tagsField, filePathField, fileType)
        } else {
            alertWarning('warning', '请输入所有字段.')
        }
    }

    function handleFileUpload(moduleName, files) {
        if (files.length == 0) return;
        let formData = new FormData();
        formData.append('file', files[0], files[0].name)
        new Api().api.uploadFile({ feature: moduleName }, formData).then(({ data }) => {
            if (data.success == '1') {
                alertSuccess('success', '文件上传成功.')
                setFilePathField(data.data)
                setFileUploadSuccess(true)
            } else {
                alertError('error', data.msg)
            }
        })
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
                <Button
                    variant="contained" size='large' onClick={handleSubmit} >提交</Button>
            </div>
            <div className={clsx(styles.bottomContainer)}>

            </div>
        </div>
    )
}