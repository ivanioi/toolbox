import styles from './index.module.css'
import * as React from 'react'
import { Box, Link, Rating, Typography, Chip, Button, Fab, Drawer } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { PieChart } from '@mui/x-charts/PieChart';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CalendarMonthOutlined, TaskOutlined, Add, PlusOne, AddCircleOutline, Edit, Delete, Backspace, Search } from '@mui/icons-material'
import AddForm from './components/AddForm';
import { Api } from '../../../api/Api';
import { useAlert, useDialog } from '../../../utils/AlertUtils';
import { isArrayEquals } from '../../../utils/ArrayUtils';
import EditForm from './components/EditForm';
import Summary from './components/Summary';


function Row({ row: { question, subQuestions }, onUpdate, onDelete, onEdit }) {
    function difficultyColumn(title) {
        return (
            <Chip label={title} color={title == 'Easy' ? 'success' : title == 'Medium' ? 'warning' : 'error'} />
        )
    }

    function tagsColumn(id, tags) {
        return (
            <Autocomplete
                sx={{ maxWidth: 300 }}
                multiple
                freeSolo
                id="multiple-limit-tags"
                options={tags ? tags : []}
                defaultValue={tags ? tags : []}
                getOptionLabel={(title) => title}
                onChange={(evt, val) => {
                    onUpdate({ id, questionTags: val?.length == 0 ? '' : val?.toString() })

                }}
                renderInput={(params) => (
                    <TextField sx={{ maxWidth: 300 }} {...params} variant="standard" />
                )}
            />
        )
    }

    function ratingColumn(id, rating) {
        return (
            <Rating
                name="simple-controlled"
                defaultValue={rating}
                onChange={(event, newValue) => {
                    onUpdate({ id, proficiencyRating: newValue ? newValue : 0 })
                }}
            />
        )
    }

    function statusColumn(id, status) {
        function handleClick() {
            onUpdate({ id, status: status == 0 ? 1 : 0 })
        }
        return (
            <>
                {status == 0 ?
                    <CalendarMonthOutlined onClick={handleClick} color='error' sx={{ cursor: 'pointer' }} /> :
                    <TaskOutlined onClick={handleClick} color='success' sx={{ cursor: 'pointer' }} />}
            </>
        )
    }
    const [open, setOpen] = React.useState(false);
    const ratings = [question?.proficiencyRating, ...subQuestions.map(item => item.proficiencyRating)];
    const tags = [question?.questionTags?.split(','), ...subQuestions.map(item => item?.questionTags?.split(","))]
    const status = [question.status, ...subQuestions.map(item => item.status)]

    function _row(row, idx, isSub = false) {
        return <TableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' }, display: isSub ? open ? '' : 'none' : '' }}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {isSub ? "⭐" : open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell align='left'><Link target="_blank" rel="noopener" href={row.link}><Typography variant='body1'>{row.name}</Typography></Link></TableCell>
            <TableCell align="left"><Typography variant='body1'>{row.mainType}</Typography></TableCell>
            <TableCell align="left"><Typography variant='body1'>{row.subType}</Typography></TableCell>
            <TableCell align="left">{difficultyColumn(difficultyOptions.find(item => item.value == row.level)?.title)}</TableCell>
            <TableCell align="left"><Typography variant='body1'>{row.origin}</Typography></TableCell>
            <TableCell align="left"><Typography variant='body1'>{ratingColumn(row.id, ratings[idx])}</Typography></TableCell>
            <TableCell align="left">{tagsColumn(row.id, tags[idx])}</TableCell>
            <TableCell align="left">{statusColumn(row.id, status[idx])}</TableCell>
            <TableCell align='left'>
                <Button size='small' variant="contained" color="info" startIcon={<Edit />} onClick={() => onEdit(row)}>
                    Edit
                </Button>
                <Button
                    sx={{ marginLeft: 1 }} size='small' variant="contained" color="warning" startIcon={<Backspace />}
                    onClick={() => onDelete(row.name, row.id)}>
                    Del
                </Button>
            </TableCell>
        </TableRow>
    }
    return (
        <React.Fragment>
            {_row(question, 0)}
            {
                subQuestions.map((q, idx) => _row(q, idx + 1, true))
            }
        </React.Fragment>
    );
}


export default function LeetCodePanel() {
    const API = new Api().leetCode;
    const { alertSuccess, alertError } = useAlert();
    const dialogTo = useDialog()

    // operation drawer
    // oprCode: add, edit
    const [oprCode, setOprCode] = React.useState(false);
    const [oprData, setOprData] = React.useState();
    const [open, setOpen] = React.useState(false);
    function toggleDrawer(isOpen, oprCode, oprData) {
        setOprCode(oprCode)
        setOprData(oprData)
        setOpen(isOpen)
        setRefresh(!refresh)
    }

    // load filter options data
    const [mainTypeOpts, setMainTypeOpts] = React.useState([])
    const [subTypeOpts, setSubTypeOpts] = React.useState([])
    const [tagOpts, setTagOpts] = React.useState([])
    const [originOpts, setOriginOpts] = React.useState([])

    // query
    const [mainType, setMainType] = React.useState();
    const [subType, setSubType] = React.useState();
    const [tags, setTags] = React.useState();
    const [proficiencyRating, setProficiencyRating] = React.useState();
    const [level, setLevel] = React.useState();
    const [status, setStatus] = React.useState();
    const [questions, setQuestions] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false)

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

    React.useEffect(() => {
        handleQuery();
    }, [mainType, subType, tags, proficiencyRating, level, status, refresh])



    function handleQuery() {
        return API.queryQuestions({ mainType, subType, questionTags: tags, proficiencyRating, level, status }).then(({ data }) => {
            if (data.success == '1') {
                setQuestions(data.data);
            } else {
                alertError("查询失败: " + data.msg)
            }
        })

    }

    function handleUpdate(question) {
        API.updateQuestion(question).then(({ data }) => {
            if (data.success == '1') {
                toggleDrawer(false)
                alertSuccess("更新成功")
                handleQuery()
            } else {
                alertError(data.message)
            }
        })
    }

    // Delete
    function handleDelete(name, id) {
        dialogTo('Tip', `请确定是否删除 ${name} 算法题`, () => {
            API.deleteQuestion({ id }).then(({ data }) => {
                if (data.success == '1') {
                    alertSuccess("删除成功")
                    handleQuery()
                } else {
                    alertError("删除失败: " + data.message)
                }
            })
        })
    }

    // Edit
    function handleClickEdit(question) {
        toggleDrawer(true, 'edit', question)
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', width: '100%' }}>
            {/* <Summary /> */}
            <Typography sx={{ marginBottom: '10px' }} variant='h5'>Problems</Typography>
            <Box sx={{ marginBottom: '10px', display: 'flex', height: '100%', width: '100%', flexWrap: "wrap", justifyContent: 'flex-start', alignContent: 'center', gap: '10px' }}>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    size='small'
                    options={mainTypeOpts}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, val) => setMainType(val.length == 0 ? null : val.map(i => i.title).toString())}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        );
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Main Type" placeholder="Type" />
                    )}
                />

                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    size='small'
                    options={subTypeOpts}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, val) => setSubType(val.length == 0 ? null : val.map(i => i.title).toString())}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        );
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Sub Type" placeholder="Type" />
                    )}
                />

                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    size='small'
                    options={tagOpts}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, val) => setTags(val.length == 0 ? null : val.map(i => i.title).toString())}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        );
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Tags" placeholder="Tag" />
                    )}
                />

                <Autocomplete
                    multiple
                    size='small'
                    options={proficiencyOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, val) => setProficiencyRating(val.length == 0 ? null : val.map(i => i.value).toString())}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        );
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Proficiency" placeholder="⭐" />
                    )}
                />

                <Autocomplete
                    multiple
                    size='small'
                    options={difficultyOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, val) => setLevel(val.length == 0 ? null : val.map(item => item.value).toString())}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        );
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Difficulty" placeholder="e/m/h" />
                    )}
                />

                <Autocomplete
                    multiple
                    size='small'
                    options={statusOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, val) => setStatus(val.length == 0 ? null : val.map(item => item.value).toString())}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        );
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Status" placeholder="status" />
                    )}
                />
                <Button variant="contained" color="info" startIcon={<Search />} onClick={handleQuery}>
                    Query
                </Button>
                <Button variant="contained" color="info" startIcon={<Add />} onClick={() => toggleDrawer(true, 'add')}>
                    Add
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Main Type</TableCell>
                            <TableCell align="left">Sub Type</TableCell>
                            <TableCell align="left">Difficulty</TableCell>
                            <TableCell align="left">Origin</TableCell>
                            <TableCell align="left">Proficiency</TableCell>
                            <TableCell align="left">Tags</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Oprs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((row) => (
                            <Row key={row.id} row={row} onDelete={handleDelete} onEdit={handleClickEdit} onUpdate={handleUpdate} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Drawer anchor='right' open={open} onClose={() => toggleDrawer(false)} >
                {
                    oprCode == 'add' ? (
                        <AddForm
                            onClose={() => toggleDrawer(false)}
                        />
                    ) : oprCode == 'edit' ?
                        <EditForm
                            onClose={() => toggleDrawer(false)}
                            question={oprData}
                        /> : <></>

                }

            </Drawer>
        </Box>
    )
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const statusOptions = [
    { title: '未完成', value: '0' },
    { title: '已完成', value: '1' }
]
const difficultyOptions = [
    { title: 'Easy', value: '0' },
    { title: 'Medium', value: '1' },
    { title: 'Hard', value: '2' }
]
const proficiencyOptions = [
    { title: '⭐', value: '0' },
    { title: '⭐⭐', value: '1' },
    { title: '⭐⭐⭐', value: '2' },
    { title: '⭐⭐⭐⭐', value: '3' },
    { title: '⭐⭐⭐⭐⭐', value: '4' }
]