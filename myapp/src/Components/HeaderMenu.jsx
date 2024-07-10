import React, { useState } from 'react'

const HeaderMenuComp = ({ titles, setSelectedComponent }) => {
    const [indexShowUnderLine, setIndexShowUnderLine] = useState(0)

    const choiceComp = (title, index) => {
        setSelectedComponent(title)
        setIndexShowUnderLine(index)
    }

    return (
        <div>
            {
                titles.map((title, index) => {
                    return <label onClick={() => choiceComp(title, index)} key={index} style={{ margin: '10px' }}>
                        {
                            indexShowUnderLine == index ? <u>{title}</u> : title
                        }
                    </label>
                })
            }
        </div>
    )
}

export default HeaderMenuComp