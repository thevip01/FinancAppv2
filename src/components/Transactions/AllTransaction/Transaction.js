import React, { useContext, useEffect, useState } from 'react'
import { contextData } from '../../utils/DataContext'
import { Fields, dataSort } from '../../utils/Constant';
import '../../assets/styles/Transaction.css'
import { Link } from 'react-router-dom';
import { helper } from '../../utils/helper';
import { ToastContainer, toast } from 'react-toastify';
import { FieldGeneratorGlobal } from '../../utils/helper';


const Transaction = () => {

    const myDataSet = useContext(contextData);
    let myAllData = myDataSet['transactionData'];
    const [myData, setMyData] = useState(myAllData);

    //Sort
    // eslint-disable-next-line
    const [isGroupBy, setIsGroupBy] = useState(false)
    const [isSortClick, setIsSortClick] = useState(0)
    const [cuurentSortElement, setCuurentSortElement] = useState('')


    //Paggination
    // eslint-disable-next-line
    const [currentPage, setCurrentPage] = useState(0)
    const perPage = 3;
    const [page, SetPage] = useState(0);

    useEffect(() => {
        if (myAllData.length > perPage) {
            pagehandler(page)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Group by
    const [groupBy, setGroupBy] = useState('')
    const [myGroupData, setMyGroupData] = useState([])
    const GenerateTableGroup = (e) => {
        setGroupBy(e.target.value);
    }

    const GenerateGroupBy = () => {
        let TableArr = []
        TableArr.push(myAllData.map((myData, i) => {
            return myData[groupBy];
        }))

        const TableSet = new Set(...TableArr)
        TableArr = new Array(...TableSet);

        const GroupData = []
        TableArr.map((groupElment, i) => {
            GroupData[i] = myAllData.map((myData1, i) => {
                return (groupElment == myData1[groupBy]) && myAllData[i]
            })
        })
        const myGroupData = GroupData.map(array => {
            return (array.filter(element => {
                if (element !== false) {
                    return element
                }
            }))
        })

        return (
            myGroupData.map((MyTablesArr, i) => {
                return (
                    <div key={i} className='table-grouped'>
                        <h2>{TableArr[i]}</h2>
                        {TableGenerator(MyTablesArr, ChangeOrder, DeleteRecord)}
                    </div>
                )
            })
        )

    }

    //Re-Usable
    const MyDataChanged = (listData) => {
        const offset1 = 0 * perPage;
        const slice = listData.slice(offset1, offset1 + perPage);
        setMyData(slice)
        setIsSortClick(0);
    }

    // Sorting
    const ChangeOrder = (listData, e) => {
        const elementName = e.target.id;
        console.log(isSortClick, cuurentSortElement);
        if (isSortClick === 0 || elementName !== cuurentSortElement) {
            console.log('asc');
            setCuurentSortElement(elementName);
            let shortedArray = myData
            if (isGroupBy) {
                const res = dataSort(listData, elementName, 'asc')
                shortedArray[elementName] = res
            } else {
                shortedArray = dataSort(listData, elementName, 'asc')
            }
            console.log(shortedArray);
            setMyData(shortedArray);
            setIsSortClick(1);
        }
        if (isSortClick === 1 && elementName === cuurentSortElement) {
            setCuurentSortElement(elementName);
            let shortedArray = myData
            if (isGroupBy) {
                const res = dataSort(listData, elementName, 'desc')
                shortedArray[elementName] = res
            } else {
                shortedArray = dataSort(listData, elementName, 'desc')
            }
            setMyData(shortedArray);
            setIsSortClick(2);
        }
        if (isSortClick === 2 && elementName === cuurentSortElement) {
            const offset1 = 0 * perPage;
            const slice = myAllData.slice(offset1, offset1 + perPage);
            setMyData(slice)
            setIsSortClick(0);
        }
    }

    //Paggination
    const pagehandler = (item) => {
        let tableData = [...myAllData];
        const offset = item * perPage;
        const slice = tableData.slice(offset, offset + perPage);
        setMyData(slice);
        SetPage(item)
    }

    let pageNo = Math.ceil(myAllData.length / perPage);
    const pageno = [];
    for (let i = 1; i <= pageNo; i++) {
        pageno.push(i)
    }

    //Deleting Record
    const DeleteRecord = (e) => {
        const id = e.target.id;
        let dummyMyData = myAllData;
        helper.remove(dummyMyData, dummyMyData[id]);
        MyDataChanged(dummyMyData);
        notify()
    }

    //Data Delete Toast notify
    const notify = () => {
        toast.info("Data Deleted",
            {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                closeOnClick: true,
            })
    }

    return (
        <div>
            <div className='button-div'>
                <Link to='/add'><button className='page button'>Add Transaction</button></Link>
                <div className='groupby-div'>
                    {FieldGeneratorGlobal('Group By', 'groupby', 'select', [undefined, 'Transaction_Date', 'Month_Year', 'Transaction_Type'], GenerateTableGroup)}
                </div>
            </div>
            {groupBy && GenerateGroupBy()}
            {
                !groupBy && (
                    myData[0] ?
                        TableGenerator(myData, ChangeOrder, DeleteRecord) :
                        <h1>No Data Found</h1>)
            }
            {
                !groupBy &&
                <div className='myPages'>
                    {
                        pageno.map((item, index) => (
                            <span key={index} className="page" onClick={(e) => { pagehandler(item - 1) }}>Page {item}</span>
                        ))
                    }
                </div>
            }
            <ToastContainer autoClose={1000} />
        </div >
    )
}


export const TableGenerator = (Data, ChangeOrder, DeleteRecord) => {
    return (
        <>
            <table className='MyTable'>
                <thead>
                    <tr>
                        {Fields.map((FieldsItem, FieldsIndex) => {
                            return (<th key={FieldsIndex} id={FieldsItem} onClick={e => ChangeOrder(Data, e)}>{FieldsItem}</th>)
                        })}
                        <th>#</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (Object.values(Data)).map((TableData, TableIndex) => {
                            return (<tr key={TableIndex}>
                                {
                                    (Object.values(TableData)).map((TableFieldData, TableFieldIndex) => {
                                        return (
                                            TableFieldData.startsWith('data:image/') ?
                                                <td key={TableFieldIndex}>
                                                    <img width='30px' src={TableFieldData} alt="img" />
                                                </td> :
                                                <td key={TableFieldIndex}>{TableFieldData}</td>
                                        )
                                    })
                                }
                                <td key={'edit' + TableIndex}><Link className='button_one' to={'/edit/' + TableIndex}>Edit</Link></td>
                                <td key={'view' + TableIndex}><Link className='button_two' to={'/view/' + TableIndex}>View</Link></td>
                                <td key={'delete' + TableIndex}><span className='button_three' id={TableIndex} onClick={e => DeleteRecord(e)}>Delete</span></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table >
        </>
    )
}

export default Transaction