import styled from 'styled-components'
import Colors from '../Themes/Colors'

export default styled.section`
  background: ${props => props.backgroundColor || Colors.bodyBackgroundColor};
  height: 100%;
  width: 100%;
  color: ${props => props.textColor || Colors.bodyTextColor};
`
