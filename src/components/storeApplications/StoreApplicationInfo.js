import React from "react";
import Rating from "@mui/material/Rating";
import StarBorder from '@material-ui/icons/StarBorder';
import Canvas from "../common/Canvas";
import { useSelector } from "react-redux";

import "./StoreApplicationInfo.scss";

const StoreApplicationInfo = ({ storeApplication }) => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="storeApplication-info full-width shadow-2px inter radius-15px white-bg flex-row-between2col ">
      <div className="storeApplication-info--img flex-row-center">
        {storeApplication.logo === 'No Image' ?
          <Canvas name={storeApplication.storeName} width={130} height={130} fontSize={'100px'} />
          :
          <img src={storeApplication.logo} className='white-bg' alt="" />
        }
        <div className={`storeApplication-info--status ${storeApplication.status === 'Approved' ? 'green-bg' : (storeApplication.status === 'Pending' ? 'yellow-bg' : 'red-bg')} shadow-5px radius-circular`}></div>
      </div>
      <div className="storeApplication-info--info flex-row-top-between2col flex-wrap">
        <div className="storeApplication-info--name flex-col-left-start">
          <div className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-24px margin-8px-V font-bold`}>
            {storeApplication.storeName}
          </div>
          <div className="gray size-18px margin-12px-H">
            {storeApplication.slogan}
          </div>
        </div>
        <div className="storeApplication-info--rate flex-row-right-start margin-8px-V">
          <Rating
            name="rating"
            style={{ color: "#FDCC0D" }}
            emptyIcon={<StarBorder className="gray" fontSize='inherit' />}
            value={storeApplication.raing}
            precision={0.1}
            size={"medium"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
export default StoreApplicationInfo;
