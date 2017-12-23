export const ActionType = {
  RESET: 'RESET',
  NEW_GAME: 'NEW_GAME',
  RECODE_GAME: 'RECODE_GAME',
  PUT_MARK: 'PUT_MARK',
  JUMP_TO: 'JUMP_TO',
  CHENGE_SORT: 'CHENGE_SORT',
  CHENGE_MODE: 'CHENGE_MODE',
  CHENGE_CPU: 'CHENGE_CPU',
  CHENGE_CPU_ORDER: 'CHENGE_CPU_ORDER',
  CHENGE_CPU_DIFFICULTY: 'CHENGE_CPU_DIFFICULTY',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  OPEN_BLOCK_MODAL: 'OPEN_BLOCK_MODAL',
  CLOSE_BLOCK_MODAL: 'CLOSE_BLOCK_MODAL',
};

export function reset() {
  return { type: ActionType.RESET };
}

export function newGame() {
  return { type: ActionType.NEW_GAME };
}

export function recodeGame() {
  return { type: ActionType.RECODE_GAME };
}

export function putMark(index) {
  return {
    type: ActionType.PUT_MARK,
    chengeSquare: index,
  };
}

export function jumpTo(step) {
  return {
    type: ActionType.JUMP_TO,
    step,
  };
}

export function chengeSort() {
  return { type: ActionType.CHENGE_SORT };
}

export function chengeMode() {
  return { type: ActionType.CHENGE_MODE };
}

export function chengeCpu() {
  return { type: ActionType.CHENGE_CPU };
}

export function chengeCpuOrder() {
  return { type: ActionType.CHENGE_CPU_ORDER };
}

export function chengeCpuDifficulty() {
  return { type: ActionType.CHENGE_CPU_DIFFICULTY };
}

export function openModal() {
  return { type: ActionType.OPEN_MODAL };
}

export function closeModal() {
  return { type: ActionType.CLOSE_MODAL };
}

export function openBlockModal() {
  return { type: ActionType.OPEN_BLOCK_MODAL };
}

export function closeBlockModal() {
  return { type: ActionType.CLOSE_BLOCK_MODAL };
}
