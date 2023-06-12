import React, { Fragment, useState } from "react";
// import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import "./Search.scss";


export const Search = () => {
  const [filterList, setFilterList] = useState(false)

  const filterClickHandler = (event) => {
    setFilterList(event)
    setFilterList(!filterList)
  }


  return (
    <Fragment>
      <div className="search white-bg shadow-5px full-width gray radius-15px padding-4px-V size-8px ">
        <i class="bi bi-search"></i>
        <input
          className="searchInput"
          type="text"
          placeholder="Type to search"
        />
        <i className="bi bi-sliders pointer" onClick={filterClickHandler.bind(null, !filterList)}></i>
      </div>
      {filterList && <form className="flex-col-left-start mint-green-bg shadow-5px full-width gray radius-15px">
        <div className="Admin-filter flex-row-left-start ">
          Statue :
          <input type="radio" name="statue" id="online" value="online" />
          <label for="online ">online</label>
          <input type="radio" name="my-input" id="offline" value="offline" />
          <label for="offline">offline</label>
        </div>
        <div className="Dlivery-Filter flex-row-left-start flex-col-left-start">
          <div ClassName="Dlivery-Statue">
            Statue :
            <input type="checkbox" name="statue" id="online" value="online" />
            <label for="online ">online</label>
            <input type="checkbox" name="statue" id="offline" value="offline" />
            <label for="offline">offline</label>
            <input type="checkbox" name="statue" id="Deactivated" value="Deactivated" />
            <label for="Deactivated">Deactivated</label>
            <input type="checkbox" name="statue" id="Having order" value="Having order" />
            <label for="Having order">Having order</label>
          </div>

          <div ClassName="Dlivery-#-of-orders">
            # of orders :
            <input type="radio" name="statue" id="less-than-20" value="less-than-20" />
            <label for="less-than-20 ">less than 20</label>
            <input type="radio" name="statue" id="more-20-less-50" value="more-20-less-50" />
            <label for="more-20-less-50">more than 20 and less than 50</label>
            <input type="radio" name="statue" id="more-than-50" value="more-than-50" />
            <label for="more-than-50">more than 50</label>
          </div>



        </div>

      </form>}
    </Fragment>
  );
};
export default Search;
