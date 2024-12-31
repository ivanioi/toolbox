import React from 'react'
import clsx from 'clsx'
import styles from './index.module.css'
import CalculatorItem from '../CalculatorItem'
import ArithmeticStep from '../ArithmeticStep'
import InputArea from '../InputArea'
import arithmeticParser from '@/src/utils/ArithmeticParser'
import { useAlert } from '../../../../../utils/AlertUtils'

/**
 * NOW: Arithmetic Parser Not Support E 
 * @returns 
 */

export default function Calculator() {
    // [{id: 1,expr: '1', opr: '[+-*/]', desc: "msg", unit: 'MB/s/HZ......' }]  expr may be is (12+23*10) or value
    // last item is current step
    const [stepHistory, setStepHistory] = React.useState([])
    const [curStep, setCurStep] = React.useState({ expr: '', opr: '', unit: '' })
    const units = ["Billion", "Million", "Bit", "Byte", "MB", "KB", "GB", "TB", "Hz", "KHz", "MHz", "GHz", "DAU", "WAU", "MAU", "Hours", "Minutes", "Days", "Weeks", "Months", "Years"]

    const { alertError, alertWarning } = useAlert()

    function handleExpr(val) {
        // 10e-10 负号值为 -- 且只能根在 e 后面
        if (val == '--') {
            if (curStep.expr[curStep.expr.length - 1] != 'e') {
                alertWarning('负号只能用于 9e-10 科学表达式内!', false)
                return;
            }
            val = '-'
        }
        setCurStep({ ...curStep, expr: curStep.expr + val })
    }

    function handleArithmeticOpr(val) {
        if (isInParentheses(curStep.expr)) {
            setCurStep({ ...curStep, expr: curStep.expr + (val != 'X' ? val : '*') })
        } else {
            setStepHistory([
                ...stepHistory,
                {
                    id: curStep.expr + Math.random(),
                    expr: curStep.expr,
                    opr: val,
                    unit: curStep.unit,
                }
            ])

            if (val == '=') {
                let code = '';
                for (let i = 0; i < stepHistory.length; i++) {
                    code += stepHistory[i].expr.trim()
                    code += stepHistory[i].opr == 'X' ? '*' : stepHistory[i].opr == "=" ? '' : stepHistory[i].opr
                }
                code += (curStep.expr + "").trim()
                setCurStep({ expr: arithmeticParser(code), opr: '', unit: '' })
            } else {
                setCurStep({ expr: '', opr: '', unit: '' })
            }
        }
    }


    function handleClearOpr() {
        setCurStep({ ...curStep, expr: '' })
        setStepHistory([])

    }

    function handleDeleteOpr() {
        setCurStep({ ...curStep, expr: curStep.expr.length == 0 ? '' : curStep.expr.substring(0, curStep.expr.length - 1) })
    }

    function handleDeleteStep(id) {
        setStepHistory(stepHistory.filter(item => item.id != id))
    }

    function handleDesc(id, desc) {
        setStepHistory(stepHistory.map(
            item => {
                if (item.id == id) return { ...item, desc: desc }
                return { ...item }
            }
        ))
    }

    function handleUnit(val) {
        setCurStep({ ...curStep, unit: val })
    }

    function isInParentheses(expr) {
        let l = 0
        let r = 0
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] == '(') l++
            else if (expr[i] == ')') r++
        }
        return l != r
    }


    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.itemContainer, styles.leftContainer)}>
                <div className={clsx(styles.leftStepContainer)}>
                    {
                        stepHistory.map(item => {
                            return (
                                <ArithmeticStep key={item.id} value={item} onDelete={handleDeleteStep} onChangeDesc={handleDesc} />
                            )
                        })
                    }
                </div>
                <div className={clsx(styles.leftInputContainer)}>
                    <InputArea units={units} step={curStep} onChange={(val) => setCurStep({ ...curStep, expr: val })} onUnitChange={handleUnit} />
                </div>
            </div>
            <div className={clsx(styles.itemContainer, styles.rightContainer)}>
                <div className={clsx(styles.rightRowContainer)}>
                    <CalculatorItem content="C" onClick={() => handleClearOpr()} />
                    <CalculatorItem content="Del" onClick={() => { handleDeleteOpr() }} />
                    <CalculatorItem content="(" onClick={() => { handleExpr('(') }} />
                    <CalculatorItem content=")" onClick={() => { handleExpr(')') }} />
                    <CalculatorItem content="=" isEqual onClick={() => handleArithmeticOpr('=')} />
                </div>
                <div className={clsx(styles.rightRowContainer)}>
                    <CalculatorItem content="7" isNumber onClick={() => { handleExpr('7') }} />
                    <CalculatorItem content="8" isNumber onClick={() => { handleExpr('8') }} />
                    <CalculatorItem content="9" isNumber onClick={() => { handleExpr('9') }} />
                    <CalculatorItem content="-" isNumber onClick={() => handleExpr("--")} />
                    <CalculatorItem content="/" onClick={() => handleArithmeticOpr("/")} />
                </div>
                <div className={clsx(styles.rightRowContainer)}>
                    <CalculatorItem content="4" isNumber onClick={() => { handleExpr('4') }} />
                    <CalculatorItem content="5" isNumber onClick={() => { handleExpr('5') }} />
                    <CalculatorItem content="6" isNumber onClick={() => { handleExpr('6') }} />
                    <CalculatorItem content="?" isDisable={true} />
                    <CalculatorItem content="X" onClick={() => handleArithmeticOpr('X')} />
                </div>
                <div className={clsx(styles.rightRowContainer)}>
                    <CalculatorItem content="1" isNumber onClick={() => { handleExpr('1') }} />
                    <CalculatorItem content="2" isNumber onClick={() => { handleExpr('2') }} />
                    <CalculatorItem content="3" isNumber onClick={() => { handleExpr('3') }} />
                    <CalculatorItem content="?" isDisable={true} />
                    <CalculatorItem content="−" onClick={() => handleArithmeticOpr("-")} />
                </div>
                <div className={clsx(styles.rightRowContainer)}>
                    <CalculatorItem content="0" isNumber onClick={() => { handleExpr('0') }} />
                    <CalculatorItem content="." isNumber onClick={() => { handleExpr('.') }} />
                    <CalculatorItem content="e" isNumber onClick={() => handleExpr('e')} />
                    <CalculatorItem content="?" isDisable={true} />
                    <CalculatorItem content="+" onClick={() => handleArithmeticOpr('+')} />
                </div>
            </div>
        </div>
    )
}