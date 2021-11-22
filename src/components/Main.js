
import {useState, Fragment, useRef} from 'react';
import {useDrop} from 'react-dnd';
import DragElement from './DragElement';

import {checkPosition, moveInArea, combineElement} from '../store/actions'
import {TYPE_DRAG, ELEMENT_LIST, ANPHABET} from '../constants/Constant';
import '../App.css'
const Main = ()=> {
    const [listLibrary, setListLibrary] = useState(ELEMENT_LIST.slice(0, 4))
    const [listDropArea, setListDropArea] = useState([])
    listLibrary.sort((elm1, elm2) => elm1.name.localeCompare(elm2.name));
    let top = 0;
    let left = 20;
    const displayLibrary = listLibrary.map((elm) =>{
        const element = {...elm, top, left}
        top+=60;
        return element;
    })

    const [, drop] = useDrop(()=>({
        accept: TYPE_DRAG,
        drop: (item, monitor)=>{
            const delta = monitor.getDifferenceFromInitialOffset()
            const newTop = Math.round(item.top + delta.y);
            let newLeft = Math.round(item.left + delta.x + window.innerWidth*0.83)
            if(newLeft > window.innerWidth*0.83){
                newLeft = newLeft - window.innerWidth*0.83
            }
        
            const listDuplicatePos = checkPosition(item.top, item.left, newTop, newLeft, listDropArea)
            console.log('list duplicate pos', listDuplicatePos)
            if(listDuplicatePos===undefined || listDuplicatePos.length === 0){
                const newListArea = moveInArea(item.id, item.top, item.left, newTop, newLeft, listDropArea);
                setListDropArea([...newListArea]); 
            }else {
                const {area, library} = 
                    combineElement(item.id, item.top, item.left, newTop, newLeft, listDuplicatePos, listDropArea, listLibrary);
                setListDropArea([...area]);
                setListLibrary([...library]);
            }          
        }
    }), [listDropArea, listLibrary])
    const refLibrary = useRef()
    const findElmByName = (char) =>{
        const element = displayLibrary.find(value=>{
            return char.toLowerCase() === value.name.charAt(0);
        })
        console.log(char, element);
        if(element){
            // console.log('scrollTo', element.top + 50);
            refLibrary.current.scrollTo(0, element.top)
            // window.scrollTo(0, 180)
        }else return;
    }
    
    return (
        <Fragment>
            <div className='drop__area' ref= {drop}>
                {listDropArea.map((elm, index)=>{
                    return <DragElement key = {index} element = {elm} flexDirection = {'column'}
                     />
                })}
            </div>
            <div className='anphabet'>
                <ul>
                    {ANPHABET.map(value => {
                        return <li key={value} onClick = {()=>findElmByName(value)}>{value}</li>
                    })}
                </ul>
            </div>
            <div className='library' ref={refLibrary} >
                {displayLibrary.map((elm)=>{
                    return <DragElement key = {elm.id} element = {elm} />
                })}
            </div>
        </Fragment>
    )

}

export default Main;