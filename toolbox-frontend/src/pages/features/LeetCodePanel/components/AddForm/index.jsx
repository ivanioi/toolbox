import * as React from 'react'
import { Box, TextField, Autocomplete, Chip, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Button } from "@mui/material";
import { Api } from '../../../../../api/Api';
import { useAlert } from '../../../../../utils/AlertUtils';
export default function AddForm({ onClose }) {
    const API = new Api().leetCode;
    const { alertSuccess, alertWarning, alertError } = useAlert()


    // load filter options data
    const [mainTypeOpts, setMainTypeOpts] = React.useState([])
    const [subTypeOpts, setSubTypeOpts] = React.useState([])
    const [tagOpts, setTagOpts] = React.useState([])
    const [originOpts, setOriginOpts] = React.useState([])


    const [name, setName] = React.useState();
    const [link, SetLink] = React.useState();
    const [mainType, setMainType] = React.useState();
    const [subType, setSubType] = React.useState();
    const [questionTags, setQuestionTags] = React.useState();
    const [origin, setOrigin] = React.useState();
    const [level, setLevel] = React.useState('0');
    const [isIconic, setIsIconic] = React.useState('1');

    React.useEffect(() => {
        API.selectFilterColumns({ mainType }).then(({ data }) => {
            if (data.success == '1') {
                const { mainTypes, origins, subTypes, tags } = data.data;
                if (mainTypeOpts.length == mainTypes.length &&
                    originOpts.length == origins.length &&
                    subTypeOpts.length == subTypes.length &&
                    tagOpts.length == tags.length
                ) {
                    return;
                }
                setMainTypeOpts(mainTypes.map(i => ({ title: i })))
                setSubTypeOpts(subTypes.map(i => ({ title: i })))
                setOriginOpts(origins.map(i => ({ title: i })))
                setTagOpts(tags.map(i => ({ title: i })))
            } else {
                alertError(data.message)
            }
        })
    })


    function handleAdd() {
        console.log(name, link, mainType, subType, questionTags, origin, level, isIconic)
        API.leetCode.addQuestion({
            name, link, mainType, subType, questionTags, origin, level, isIconic
        }).then(({ data }) => {
            if (data.success == '1') {
                alertSuccess("添加成功")
                onClose()
            } else {
                alertError(data.message)
            }
        })
    }
    return (
        <Box sx={{ minWidth: '25vw', maxWidth: '25vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 2, gap: 2 }}>
            <TextField
                label="Name"
                helperText="Question Name"
                variant="standard"
                value={name}
                onChange={(evt, val) => setName(evt.target.value)}
            />
            <TextField
                label="Link"
                helperText="Question Link"
                variant="outlined"
                value={link}
                onChange={(evt, val) => SetLink(evt.target.value == '' ? null : evt.target.value)}
            />
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={mainTypeOpts.map((option) => option.title)}
                onInputChange={(evt, val) => setMainType(val == '' ? null : val)}
                renderInput={(params) =>
                    <TextField
                        label="Main Type"
                        helperText="like List, Array, Logic"
                        {...params} />
                }
            />
            <Autocomplete
                id="subType"
                freeSolo
                options={subTypeOpts.map((option) => option.title)}
                onInputChange={(evt, val) => setSubType(val == '' ? '' : val)}
                renderInput={(params) =>
                    <TextField
                        label="Sub Type"
                        helperText="More detail"
                        {...params} />
                }
            />

            <Autocomplete
                multiple
                id="tags-filled"
                options={tagOpts.map((option) => option.title)}
                freeSolo
                onChange={(evt, val) => setQuestionTags(val.length == 0 ? '' : val.toString())}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                            <Chip variant="outlined" label={option} key={key} {...tagProps} />
                        );
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Tags"
                        placeholder="Favorites"
                    />
                )}
            />

            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={originOpts.map((option) => option.title)}
                onInputChange={(evt, val) => setOrigin(val == '' ? null : val)}
                renderInput={(params) =>
                    <TextField
                        label="Origin"
                        {...params} />
                }
            />

            <FormLabel id="demo-controlled-radio-buttons-group">Difficulty</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                defaultValue={0}
                onChange={(evt, val) => setLevel(val)}
            >
                <FormControlLabel value="0" control={<Radio />} label={<Typography variant="body1" color="success">Easy</Typography>} />
                <FormControlLabel value="1" control={<Radio />} label={<Typography variant="body1" color="warning">Medium</Typography>} />
                <FormControlLabel value="2" control={<Radio />} label={<Typography variant="body1" color="error">Hard</Typography>} />
            </RadioGroup>

            <FormLabel id="isIconic">Iconic</FormLabel>
            <RadioGroup
                aria-labelledby="isIconic"
                name="isIconic"
                row
                defaultValue={1}
                onChange={(evt, val) => setIsIconic(val)}
            >
                <FormControlLabel value="1" control={<Radio />} label="YES" />
                <FormControlLabel value="0" control={<Radio />} label="NO" />
            </RadioGroup>

            <Button sx={{ marginTop: 2 }} variant="contained" size='large' onClick={handleAdd} >提交</Button>
        </Box>
    )
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'string' },
    { title: 'string1' },
    { title: 'string2' },
];