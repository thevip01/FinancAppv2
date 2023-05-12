import React, { useContext, useEffect, useState } from 'react'
import { contextData } from '../../utils/DataContext'
import { Fields, dataSort } from '../../utils/Constant';
import '../../assets/styles/Transaction.css'
import { Link } from 'react-router-dom';
const Transaction = () => {

    const myDataSet = useContext(contextData);
    const myAllData = myDataSet['transactionData']

    const [myData, setMyData] = useState(myAllData);


    //Sort
    const [isGroupBy, setIsGroupBy] = useState(false)
    const [isSortClick, setIsSortClick] = useState(0)
    const [cuurentSortElement, setCuurentSortElement] = useState('')


    //Paggination
    const [currentPage, setCurrentPage] = useState(0)
    const perPage = 3;
    const [page, SetPage] = useState(0);

    useEffect(() => {
        if (myAllData.length > perPage) {
            setMyData(myAllData.slice(page * perPage, page + 1 * perPage))
        }
    }, [page])


    const ChangeOrder = (listData, e, isGroupBy) => {
        const elementName = e.target.id;
        setCurrentPage(0)
        if (isSortClick === 0 || elementName !== cuurentSortElement) {
            setIsSortClick(1);
            setCuurentSortElement(elementName);

            let shortedArray = { ...myData }
            if (isGroupBy) {
                const res = dataSort(listData, elementName, 'asc')
                shortedArray[elementName] = res
            } else {
                shortedArray = dataSort(listData, elementName, 'asc')
            }
            console.log(shortedArray);
            setMyData(shortedArray);
        }
    }


    return (
        <div>
            {
                myData[0] ?
                    TableGenerator(myData, ChangeOrder) :
                    <h1>No Data Found</h1>
            }
        </div>
    )
}


export const TableGenerator = (Data, ChangeOrder) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {Fields.map((FieldsItem, FieldsIndex) => {
                            return (<th key={FieldsIndex + FieldsItem} id={FieldsItem} onClick={e => ChangeOrder(Data, e)}>{FieldsItem}</th>)
                        })}
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (Object.values(Data)).map((TableData, TableIndex) => {
                            return (<tr key={'Tr' + TableIndex}>
                                {
                                    (Object.values(TableData)).map((TableFieldData, TableFieldIndex) => {
                                        return (
                                            TableFieldData.startsWith('data:image/') ?
                                                <td key={TableFieldData + TableFieldIndex}>
                                                    <img width='30px' src={TableFieldData} alt="img" />
                                                </td> :
                                                <td key={TableFieldData + TableFieldIndex}>{TableFieldData}</td>
                                        )
                                    })
                                }
                                <td key={TableIndex}><Link to={'/edit/' + TableIndex}>Edit</Link></td>
                                <td key={TableIndex}><Link to={'/view/' + TableIndex}>View</Link></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table >
        </>
    )
}

export default Transaction