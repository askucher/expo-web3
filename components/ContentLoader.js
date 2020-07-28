import React from "react"
import ContentLoader, { Rect, Circle, Path, Code, List } from "react-content-loader/native"
import styles from "../Styles.js";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";


const MyLoader = (props) => (
    <ContentLoader
        speed={1}
        style={props.style || styles.contentLoader}
        backgroundColor="#262681"
        foregroundColor="#16135C"
        preserveAspectRatio="none"
        viewBox="0 0 100 100" 
        width={wp('50%')} 
        height={props.height || hp("10%")}
        {...props }
    >
    <Rect x="0" y="30" width="600" height="150" />
  </ContentLoader>

)

export default MyLoader