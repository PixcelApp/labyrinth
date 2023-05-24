import { useContext } from 'react'
import { ColorSchemeContext } from 'src/context/CustomChakraProvider'

export const useColors = () => useContext(ColorSchemeContext)
