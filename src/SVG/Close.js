import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            x="0px"
            y="0px"
            width="122.878px"
            height="122.88px"
            viewBox="0 0 122.878 122.88"
            xmlSpace="preserve"
            {...props}
        >
            <Path d="M1.426 8.313a4.87 4.87 0 016.886-6.886l53.127 53.127 53.127-53.127a4.87 4.87 0 116.887 6.886L68.324 61.439l53.128 53.128a4.87 4.87 0 01-6.887 6.886L61.438 68.326 8.312 121.453a4.868 4.868 0 11-6.886-6.886l53.127-53.128L1.426 8.313z" />
        </Svg>
    )
}

export default SvgComponent