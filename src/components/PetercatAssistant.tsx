import { useEffect, useState } from 'react'
import { useViewport } from '../hooks/useViewport'

declare global {
    interface Window {
        PetercatLUI: any
    }
}

const DrawerWidth = {
    pc: {
        width: 500
    },
    mobile: {
        width: 300
    }
}

const PetercatAssistant = () => {
    const { isMobile } = useViewport()
    const [drawerWidth, setDrawerWidth] = useState(isMobile ? DrawerWidth.mobile.width : DrawerWidth.pc.width)

    useEffect(() => {
        setDrawerWidth(isMobile ? DrawerWidth.mobile.width : DrawerWidth.pc.width)
    }, [isMobile])

    useEffect(() => {
        if (window.PetercatLUI) {
            window.PetercatLUI.initAssistant({
                apiDomain: 'https://api.petercat.ai',
                token: import.meta.env.VITE_PETERCAT_TOKEN,
                drawerWidth: drawerWidth,
                clearMessage: true,
            })
        } else {
            console.error('PetercatLUI is not loaded')
        }
    }, [drawerWidth])

    return null
}

export default PetercatAssistant
