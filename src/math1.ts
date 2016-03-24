'use strict';

import {add10} from './math2';

export function add5(a) {
   return a + 5;    
}

export function add15(a) {
    return add5(add10(a));  
}
