export const count = state => {
  return state.count;
}

export const working = state => {
  return {
    saving: state.working.saving,
    draging: state.working.draging,
    editing: state.working.editing
  }
}

export const config = state => {
  return {
    ctrlPanelMin: state.config.ctrlPanelMin,
    ctrlPanelWidth: state.config.ctrlPanelWidth,
    dividerWidth: state.config.dividerWidth,
    defaultLang: state.config.defaultLang,
    zoom: state.config.zoom,
    allowEditPriority: state.config.allowEditPriority,
    allowEditLabel: state.config.allowEditLabel,
    allowEditResult: state.config.allowEditResult,
    allowEditNode: state.config.allowEditNode,
    isFullScreen: state.config.isFullScreen
  }
}

export const getMinder = state => {
  return state.minder
}

export const getEditor = state => {
  return state.editor
}

export const getAllowEditResult = state => {
  return state.allowEditResult
}
