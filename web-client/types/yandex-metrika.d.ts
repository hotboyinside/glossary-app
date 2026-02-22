interface Window {
  ym?: (
    counterId: number,
    method:
      | 'hit'
      | 'init'
      | 'addFileExtension'
      | 'extLink'
      | 'notBounce'
      | 'setUserID'
      | 'userParams'
      | 'params'
      | 'replaceVars'
      | 'getClientID'
      | 'reachGoal',
    ...args: unknown[]
  ) => void;
}
