import { combineReducers } from 'redux'

import { rings,
         ghost }           from './types/ring_reducer'
import { scannerTarget  }  from './types/scanner'
import { overlays }        from './types/overlays'
import { loginStatus,
         mainInterface,
         gearBar,
         storedFocus,
         switcher,
         itemsReady,
         updateToggle,
         character,
         charModels,
         focusItem,
         focusSubclass     }  from './types/interface'



const mainReducer = combineReducers({

    rings,
    ghost,
    scannerTarget,
    overlays,
    loginStatus,
    mainInterface,
    gearBar,
    storedFocus,
    switcher,
    itemsReady,
    updateToggle,
    character,
    charModels,
    focusItem,
    focusSubclass

});


export default mainReducer