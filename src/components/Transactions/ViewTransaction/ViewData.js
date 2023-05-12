import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { contextData } from '../../utils/DataContext';

const ViewData = () => {

    const params = useParams()
    const id = params['id'];

    const contextD = useContext(contextData)
    const AllData = contextD['transactionData']
    const cardData = AllData[id]

    return (
        <div>
            <h1>Transaction Card</h1>
            <form>
                {Object.keys(cardData).map((itemKey, i) => {
                    return (<label>
                        <span> {itemKey} : {cardData[itemKey]}</span>
                    </label>)
                })
                }
            </form>
        </div>
    )
}

export default ViewData
