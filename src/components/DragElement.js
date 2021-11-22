import { useRef } from 'react';
import {useDrag, DragPreviewImage} from 'react-dnd';

import { TYPE_DRAG } from '../constants/Constant';
import '../App.css'
const DragElement = ({element, flexDirection})=>{
    const [{isDragging}, drag] = useDrag({
        type: TYPE_DRAG,
        item: {
            id: element.id,
            name: element.name,
            top: element.top,
            left: element.left,
        },
        collect: (monitor)=>({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <>
            <div className='element' style={
                {
                    top: element.top, 
                    left: element.left, 
                    flexDirection: flexDirection? flexDirection:'row', 
                    opacity: isDragging&&flexDirection? 0:1
                }
            }>
                <img ref = {drag} src={element.url} alt="" />
                <span>{element.name}</span>
            </div>
        </>
    )
}

export default DragElement;
