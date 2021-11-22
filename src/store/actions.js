import {TYPE_DRAG, ELEMENT_LIST, CONDITION_COMBINE, ANPHABET} from '../constants/Constant';

const checkPosition= (currentTop, currentLeft, top, left, listElm) => {
    if(listElm.length > 0) {
        const listDuplicatePosition = listElm.filter(elm => {
            if(Math.abs(currentTop-top)<= 30 && Math.abs(currentLeft-left)<=30){
                return;
            }else {
                return Math.abs(elm.top -top)<= 30 && Math.abs(elm.left -left)<=30;
            }    
        })
        return listDuplicatePosition;
    }   
};

const moveInArea = (id, currentTop, currentLeft, newTop, newLeft, list) =>{
    let index = 0;
    const element = ELEMENT_LIST.find(e => e.id === id);
    if(list.length > 0){
        const check = list.filter(elm=>(elm.id === id && elm.top === currentTop && elm.left === currentLeft))
        console.log('checking: ', check);
        if(check.length === 1){
            const newElm = {...check[0], top: newTop, left: newLeft}
            list.splice(newElm.index, 1, newElm);
        }else {
            index = list.length;
            list = [...list, {...element, top: newTop, left: newLeft, index}]
        }
    }else {
        list = [{...element, top: newTop, left: newLeft, index}]
    }
    return list;
};

const combineElement = (id, currentTop, currentLeft, newTop, newLeft, listDuplicatePos, listArea, listLibrary) => {
    const elmSourseDrag = ELEMENT_LIST.find(elm => elm.id === id)
    const elmTarget = listDuplicatePos[0];
    const condition_1 = elmSourseDrag.name + ' ' + elmTarget.name;
    const condition_2 = elmTarget.name + ' ' + elmSourseDrag.name;
    console.log(condition_1);
    console.log(condition_2);
    const findCombine = CONDITION_COMBINE.find(value => {
        return value.condition === condition_1 || value.condition === condition_2
    });
    console.log('combine: ', findCombine);
    var updateListArea = [...listArea];
    var updateListLibrary = [...listLibrary]
    if(!findCombine){
        updateListArea = moveInArea(id, currentTop, currentLeft, newTop, newLeft, updateListArea)
    }else{
        const results = findCombine.result.map(value => {
            return ELEMENT_LIST.find(elm => elm.name === value)
        });
        const listNewElm = results.map((elm)=>({...elm, top: newTop, left: newLeft}));
        const findElmInLibrary = listNewElm.map((value) =>{
            const element = updateListLibrary.find((elm) => {
                return elm.name === value.name
            })
            if(element===undefined){
                return {...value};
            }else return;
        }).filter((value)=>{
            return value !== undefined
        })
        updateListLibrary = [...updateListLibrary, ...findElmInLibrary]
        
        const check = updateListArea.filter(elm=>(elm.top === currentTop && elm.left === currentLeft))
        
        if(check.length > 0){
            const index = check[0].index > elmTarget.index ? elmTarget.index : elmTarget.index-1;
            updateListArea.splice(check[0].index, 1)
            updateListArea.splice(index, 1, ...listNewElm)
            updateListArea = updateListArea.map((elm, ind)=>({...elm, index: ind}))
        }else {
            updateListArea.splice(elmTarget.index, 1, ...listNewElm)
            updateListArea = updateListArea.map((elm, ind)=>({...elm, index: ind}))
        }
    }
    return {
        area: [...updateListArea],
        library: [...updateListLibrary]
    }
}

export {checkPosition, moveInArea, combineElement}