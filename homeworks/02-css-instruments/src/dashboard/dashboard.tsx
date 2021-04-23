import React from 'react';
import "./dashboar.scss";

enum IconType {
    gif = 'gif',
    png = 'png',
}

const getImage = (iconName: number, type: IconType) => {
    const iconId = `icon_${type}_${iconName}`
    return (
        <img className='image'
             src={require(`../images/${iconName}.${type}`).default}
             key={iconId}
             alt={iconId}
             style={{order: iconName}}/>
    )
}

const getArray = (length: number) => {
    return [...Array(length).keys()];
}

export const Dashboard: React.FC = () => {
    const pngCount = 10;
    const gifCount = 7;
    const existRangePng: number[] = getArray(pngCount);
    const existRangeGif: number[] = getArray(gifCount);
    return (
        <div className='wrapper'>
            <>
                {
                    existRangePng.map((img: number) => getImage(img, IconType.png))
                }
            </>
            <>
                {
                    existRangeGif.map((img: number) => getImage(img, IconType.gif))

                }
            </>
        </div>
    )
}