export const ActionType = {
    RESET: 'RESET',
    NEW_GAME: 'NEW_GAME',
    RECODE_GAME: 'RECODE_GAME',
    PUT_MARK: 'PUT_MARK',
    JUMP_TO: 'JUMP_TO',
    CHENGE_SORT: 'CHENGE_SORT',
    CHENGE_MODE: 'CHENGE_MODE',
    CHENGE_CPU: 'CHENGE_CPU',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL'
}

export function reset(){
    return { type: ActionType.RESET };
}

export function newGame(){
    return { type: ActionType.NEW_GAME };
}

export function recodeGame(){
    return { type: ActionType.RECODE_GAME };
}

export function putMark(index){
    return {
        type: ActionType.PUT_MARK,
        chengeSquare: index
    };
}

export function jumpTo(step){
    return { 
        type: ActionType.JUMP_TO,
        step: step
    };
}

export function chengeSort(){
    return { type: ActionType.CHENGE_SORT };
}

export function chengeMode(){
    return { type: ActionType.CHENGE_MODE };
}

export function chengeCpu(){
    return { type: ActionType.CHENGE_CPU };
}

export function openModal(){
    return { type: ActionType.OPEN_MODAL };
}

export function closeModal(){
    return { type: ActionType.CLOSE_MODAL };
}