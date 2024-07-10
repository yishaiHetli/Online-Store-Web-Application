import React from 'react'

const CustomTableComp = ({ titles, dataRows, customStyle }) => {
    return (
        <div>
            <table rules="all" style={customStyle ? customStyle : { border: 'solid 1px gray' }} >
                <thead>

                    <tr>
                        {
                            titles.map((title, index) => {
                                return <td key={index}><b>{title}</b></td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataRows.map((row, index) => {

                            return <tr key={index}>
                                {
                                    row.map((cell, innerIndex) => {
                                        return < td key={innerIndex}>{cell}</td>
                                    })
                                }
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div >
    )
}
export default CustomTableComp