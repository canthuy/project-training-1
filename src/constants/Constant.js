import {IMG} from '../images/index';

export const TYPE_DRAG = 'element';

export const ANPHABET = [
    'A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const ELEMENT_LIST = [
    { id: 1, name: 'water', url: IMG.img_1, },
    { id: 2, name: 'fire', url: IMG.img_2, },
    { id: 3, name: 'earth', url: IMG.img_3, },
    { id: 4, name: 'air', url: IMG.img_4, },
    { id: 5, name: 'steam', url: IMG.img_5, },
    { id: 6, name: 'lava', url: IMG.img_6, },
    { id: 7, name: 'pressure', url: IMG.img_7, },
    { id: 9, name: 'sea', url: IMG.img_9, },
    { id: 10, name: 'ocean', url: IMG.img_10, },
    { id: 11, name: 'energy', url: IMG.img_11, },
    { id: 12, name: 'mud', url: IMG.img_12, },
    { id: 13, name: 'rain', url: IMG.img_13, },
    { id: 14, name: 'dust', url: IMG.img_14, },
    { id: 15, name: 'cloud', url: IMG.img_15, },
    { id: 16, name: 'storm', url: IMG.img_16, },
    { id: 17, name: 'geyser', url: IMG.img_17, },
    { id: 19, name: 'earthquake', url: IMG.img_19, },
    { id: 20, name: 'wind', url: IMG.img_20, },
    { id: 22, name: 'sky', url: IMG.img_22, },
    { id:24, name: 'plant', url: IMG.img_24, },
    { id: 25, name: 'gunpowder', url: IMG.img_25, },
    { id: 26, name: 'explosion', url: IMG.img_26, },
    { id: 27, name: 'stone', url: IMG.img_27, },
    { id: 28, name: 'sand', url: IMG.img_28, },
    { id: 30, name: 'coal', url: IMG.img_30, },   
    { id: 163, name: 'atmosphere', url: IMG.img_163}
]

export const CONDITION_COMBINE = [
    {condition: 'air air', result: ['pressure']},
    {condition: 'air water', result:['rain']},
    {condition: 'pressure air', result:['wind', 'atmosphere']},
    {condition: 'air fire', result:['energy']},
    {condition: 'water water', result:['sea']},
    {condition: 'air energy', result:['wind']}, 
    {condition: 'earth fire', result:['lava']},
    {condition: 'water fire', result:['steam']},
    {condition: 'water energy', result:['steam']},
    {condition: 'air lava', result:['stone']},
    {condition: 'air steam', result:['cloud']},
    {condition: 'air cloud', result: ['sky']},
    {condition: 'air earth', result:['dust']},
    {condition: 'sea sea', result: ['ocean']},
    {condition: 'sea water', result: ['ocean']},
    {condition: 'earth energy', result: ['earthquake']},
    {condition: 'earth water', result: ['mud']},
    {condition: 'air stone', result: ['sand']},
    {condition: 'fire dust', result: ['gunpowder']},
    {condition: 'fire gunpowder', result: ['explosion']},
    {condition: 'earth water', result: ['plant']},
    {condition: 'plant pressure', result:['coal']}
];