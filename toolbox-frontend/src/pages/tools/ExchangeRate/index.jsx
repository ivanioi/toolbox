import React, { lazy } from 'react'
import { Select, MenuItem, TextField, Autocomplete, OutlinedInput, Typography, accordionActionsClasses } from '@mui/material'
import styles from './index.module.css'
import clsx from 'clsx';
import { LineChart } from '@mui/x-charts'
import { useAlert } from '../../../utils/AlertUtils';
import { format, getUnixTime, fromUnixTime, getMonth } from 'date-fns'
import { Api } from '../../../api/Api';
export default function ExchangeRate() {
    const API = new Api().exchangeRate;
    const { alertError } = useAlert()

    const [currencyOptions, setCurrencyOptions] = React.useState([])
    const [baseCurrency, setBaseCurrency] = React.useState({ label: 'US Dollar@usd', value: 'usd', exchangeRateList: {} })
    const [baseValue, setBaseValue] = React.useState(1)
    const [comparedCurrency, setComparedCurrency] = React.useState({ label: 'Chinese Yuan Renminbi@cny', value: 'cny' })
    const [xDataSource, setXDataSource] = React.useState([])
    const [yDataSource, setYDataSource] = React.useState([])

    React.useEffect(() => {
        API.currencies().then(({ data }) => {
            if (data.success == '1') {
                if (data.data.total > '0') {
                    setCurrencyOptions(Object.getOwnPropertyNames(data.data.currenices).map(item => {
                        return {
                            label: data.data.currenices[item] + "@" + item,
                            value: item
                        }
                    }))
                }
            } else {
                alertError(data.message)
            }
        })
        API.getExchangeRate(format(new Date(), "yyyy-MM-dd"), baseCurrency.value).then(({ data }) => {
            if (data.success == '1') {
                setBaseCurrency({ ...baseCurrency, exchangeRateList: data.detail })
            } else {
                alertError(data.message)
            }
        })

        API.getExchangeRateHistory(baseCurrency.value, comparedCurrency.value).then(({ data }) => {
            if (data.success == '1') {
                setXDataSource(data.history.map(item => {
                    return item.date.split("-")[1]
                }).sort())

                setYDataSource(data.history.sort((a, b) => { return getUnixTime(new Date(a.date)) - getUnixTime(new Date(b.date)) }).map(
                    item => Number.parseFloat(item.exchangeRate)
                ))
            } else {
                alertError(data.message)
            }
        })
    }, [])

    React.useEffect(() => {
        if (comparedCurrency && comparedCurrency.value) {
            API.getExchangeRateHistory(baseCurrency.value, comparedCurrency?.value).then(({ data }) => {
                if (data.success == '1') {
                    setXDataSource(data.history.map(item => {
                        return item.date.split("-")[1]
                    }).sort())

                    setYDataSource(data.history.sort((a, b) => { return getUnixTime(new Date(a.date)) - getUnixTime(new Date(b.date)) }).map(
                        item => Number.parseFloat(item.exchangeRate)
                    ))
                } else {
                    alertError(data.message)
                }
            })

        }
    }, [baseCurrency, comparedCurrency])

    function caculate() {
        let result = Number.parseFloat(baseValue) * Number.parseFloat(baseCurrency.exchangeRateList[comparedCurrency?.value])
        return Number.isNaN(result) ? 0 : result
    }

    function handleCompareCurrencyChange(e, v) {
        setComparedCurrency(v)
    }

    function handleBaseCurrencyChange(e, v) {
        if (v && v?.value) {
            API.getExchangeRate(format(new Date(), "yyyy-MM-dd"), v.value).then(({ data }) => {
                if (data.success == '1') {
                    setBaseCurrency({ ...v, exchangeRateList: data.detail })
                } else {
                    alertError(data.message)
                }
            })
        }
    }
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.leftContainer)}>
                <div>
                    <Typography variant='subtitle1'>{baseValue + ' ' + baseCurrency?.label.split('@')[0]} equals</Typography>
                    <Typography sx={{ mt: 1, mb: 1 }} variant='h4'>{caculate() + " " + comparedCurrency?.label}</Typography>
                    <Typography variant='body2'>{format(new Date(), "yyyy/MM/dd")}</Typography>
                </div>
                <div className={clsx(styles.leftSelectorContainer)}>
                    <OutlinedInput
                        type="number"
                        defaultValue={1}
                        onChange={(evt) => {
                            setBaseValue(evt.target.value)
                        }}
                        endAdornment={
                            <Autocomplete
                                options={currencyOptions}
                                value={baseCurrency?.label}
                                onChange={handleBaseCurrencyChange}
                                renderInput={(params) =>
                                    <TextField
                                        sx={{ borderLeft: 2, borderColor: '#dadce0', width: 250 }}
                                        classes={{ root: styles.noBorder }}
                                        {...params} />
                                } m
                            />
                        }
                    />

                    <OutlinedInput
                        type="number"
                        readOnly={true}
                        value={caculate()}
                        endAdornment={
                            <Autocomplete
                                options={currencyOptions}
                                value={comparedCurrency?.label}
                                onChange={handleCompareCurrencyChange}
                                renderInput={(params) =>
                                    <TextField
                                        sx={{ borderLeft: 2, borderColor: '#dadce0', width: 250 }}
                                        classes={{ root: styles.noBorder }}
                                        {...params} />
                                }
                            />
                        }
                    />

                </div>
            </div>
            <div>
                <LineChart
                    xAxis={[{
                        data: xDataSource
                    }]}
                    series={[
                        {
                            data: yDataSource,
                            area: true,
                        },
                    ]}
                    grid={{ vertical: true, horizontal: true }}
                    width={700}
                    height={400}
                />
            </div>
        </div>
    )
}