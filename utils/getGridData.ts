const getGridData = (element: HTMLElement) => {
  const gridComputedStyle = window.getComputedStyle(element)
  const rowsStyle = gridComputedStyle.getPropertyValue('grid-template-rows').split(' ')
  const colsStyle = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ')
  const rowCount = rowsStyle.length
  const columnCount = colsStyle.length

  return {
    cellsCount: rowCount * columnCount,
    rowCount,
    columnCount,
    gridRowSizes: rowsStyle.map(parseFloat),
    gridColumnSizes: colsStyle.map(parseFloat)
  }
}

export default getGridData
