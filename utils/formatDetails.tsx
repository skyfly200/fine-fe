import Icon from '../components/Icon'

const formatDetails = (details: Array<any>, properties: string[]) =>
  details.map(detail => {
    const newD = { ...detail }
    properties.forEach(key => delete newD[key])
    if (newD.detailContent?.includes('[icon=')) {
      const str = newD.detailContent.split('[icon=')
      newD.detailContent = (
        <>
          {str[0]} <Icon icon={str[1].split(']')[0]} />
        </>
      )
    }
    const newObj = { '1': newD.detailName, '2': newD.detailContent }
    return newObj
  })

export default formatDetails
