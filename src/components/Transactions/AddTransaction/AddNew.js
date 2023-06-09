import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react'
import { AddTransactionSchema } from '../../utils/validationHelper';
import { useForm } from 'react-hook-form';
import '../../assets/styles/AddNew.css'
import { MonthData, TransactionType, FromAccount } from '../../utils/Constant';
import '../../assets/styles/LoginPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { contextData } from '../../utils/DataContext';
import getBase64 from 'getbase64data';
import { ToastContainer, toast } from 'react-toastify';

const AddNew = () => {

    const contextD = useContext(contextData)
    const setTransactionData = contextD['setTransactionData']
    const Transaction_Data = contextD['transactionData']

    const params = useParams()
    const id = params.id;

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: Transaction_Data[id]
    }, {
        resolver: yupResolver(AddTransactionSchema)
    });

    console.log(errors);
    const myNavigator = useNavigate()

    var imgData = undefined;
    if (id) {
        imgData = Transaction_Data[id].Receipt;
    }

    // Toast 
    const notify = () => {
        toast.success("Data Added success",
            {
                position: toast.POSITION.BOTTOM_CENTER,
                hideProgressBar: true,
                closeOnClick: true,
            })
    }


    const onSubmitADD = async (e) => {
        e.preventDefault()
        const MyData = watch();
        const DummyData = Transaction_Data;
        if ((Object.keys(errors).length) === 0 && (MyData.Amount !== '')) {
            const DummyData2 = MyData;
            if (showImg) {
                var file = MyData.Receipt[0];
                const base64 = await getBase64.fromFile(file)
                DummyData2.Receipt = base64;
            }
            if (id) {
                DummyData[id] = DummyData2;
            }
            else {
                DummyData.push(DummyData2);
            }
            setTransactionData(DummyData);
            notify();
            setTimeout(() => {
                myNavigator('/transaction');
            }, 1000)
        }
        return true;
    }

    const [showImg, setShowImg] = useState(false)
    useEffect(() => {
        if (!imgData) {
            setShowImg(true)
        }
    }, [imgData])

    const removeImage = () => {
        setShowImg(true)
    }

    const FieldGenerator = (label, name, inputType, optionArray) => {
        switch (inputType.toLowerCase()) {
            case 'select':
                return (
                    <label className='selectdiv'>
                        <span> {label} :</span>
                        {/* <Select {...register(name)} isMulti options={optionArray} /> */}
                        <select {...register(name)} >
                            {optionArray &&
                                optionArray.map((optionValue, i) => {
                                    return (<option key={i} value={optionValue}>{optionValue}</option>)
                                })
                            }
                        </select>
                        {errors[name] && <span className='error-msg'>{errors[name].message}</span>}
                    </label>
                )
            case 'file':
                return (<label>
                    <span> {label} :</span>
                    {
                        !showImg && (imgData && <>
                            <img width='100px' height='60px' src={imgData} alt='none' />
                            <span className='button-45' variant="contained" onClick={removeImage}>Remove Image</span>
                        </>)
                    }
                    {showImg && <input type='file'{...register(name)} />}
                    {errors[name] && <span className='error-msg'>{errors[name].message}</span>}
                </label>)
            case 'textarea':
                return (
                    <label>
                        <span> {label} :</span>
                        <textarea type={inputType ? inputType : 'text'} placeholder={label} {...register(name)} />
                        {errors[name] && <span className='error-msg'>{errors[name].message}</span>}
                    </label>
                )
            case 'submit':
                return (
                    <label>
                        <input type='submit' value={label} />
                    </label>
                )
            default:
                return (
                    <label>
                        <span> {label} :</span>
                        <input type={inputType ? inputType : 'text'} placeholder={label} {...register(name)} />
                        {errors[name] && <span className='error-msg'>{errors[name].message}</span>}
                    </label>
                )
        }
    }

    console.log(errors['Transaction_Date']);
    return (
        <div>
            <h1>Add New Transaction</h1>
            <Link to='/login'><button className='page button'>Logout</button></Link>
            <form onSubmit={e => { handleSubmit(); onSubmitADD(e); }}>
                {FieldGenerator('Transaction Date', 'Transaction_Date', 'date')}
                {FieldGenerator('Month Year', 'Month_Year', 'Select', MonthData)}
                {FieldGenerator('Transaction Type', 'Transaction_Type', 'Select', TransactionType)}
                {FieldGenerator('From Account', 'From_Account', 'Select', FromAccount)}
                {FieldGenerator('To Account', 'To_Account', 'Select', FromAccount)}
                {FieldGenerator('Amount', 'Amount', 'text')}
                {FieldGenerator('Receipt', 'Receipt', 'file')}
                {FieldGenerator('Notes', 'Notes', 'textarea')}
                {FieldGenerator('ADD', '', 'submit')}
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddNew
