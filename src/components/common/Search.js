import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { specialityActions } from "../../apis/actions";
import { specialityMutations } from "../../redux/mutations";

import "./Search.scss";

const Search = ({ width, onSearch, page }) => {
  const [filterList, setFilterList] = useState(false);
  const dispatch = useDispatch();
  const specialities = useSelector((state) => state.speciality.specialties);

  const inputRef = useRef(null);
  const query = useRef('');
  const searchType = useRef('all');
  const filter = useRef({
    status: '',
    specialty: '',
    working: null,
    vehicle: '',
    reviewee: '',
  });

  useEffect(() => {
    if (page === 'Stores') {
      dispatch(specialityMutations.setSpecialties(null));
      dispatch(specialityActions.getSpecialties());
    }
  }, [dispatch, page]);

  const filterClickHandler = (isFilterList) => {
    if (isFilterList === true) {
      query.current = '';
      searchType.current = 'all';
      filter.current.status = '';
      filter.current.specialty = '';
      filter.current.working = null;
      filter.current.vehicle = '';
    }
    handleSearch();
    setFilterList(!isFilterList)
  }

  const handleSearch = () => {
    onSearch(query.current, searchType.current, filter.current);
    inputRef.current.focus();
  };

  return (
    <div className={`flex-col-center ${width}`}>
      <div className={`search-bar white-bg flex-row-between pt-sans shadow-5px full-width gray radius-20px`} >
        <i className="bi bi-search search-bar--icon size-18px margin-4px-H" />
        <input
          className="search-bar--input size-20px full-width gray"
          type="text"
          placeholder="Type to search"
          value={query.current}
          onChange={(e) => {
            query.current = e.target.value;
            handleSearch();
          }}
          ref={inputRef}
        />
        {query.current !== '' &&
          <i className='bi bi-x search-bar--icon pointer red size-26px margin-8px-H' onClick={filterClickHandler.bind(null, true)} />
        }
        <i className="bi bi-sliders search-bar--icon pointer size-18px" onClick={filterClickHandler.bind(null, filterList)} />
      </div>
      {(filterList && page) &&
        <form noValidate className="flex-row-top-between2col search-bar--filter orange-bg shadow-5px full-width gray inter">
          {(page === 'Admins' || page === 'Stores' || page === 'Customers' || page === 'Products' || page === 'OrdersHistory' || page === 'Orders' || page === 'Drivers' || page === 'Logs' || page === 'Reviews') &&
            <div className="flex-row-top-start size-16px margin-8px-V width-50-100">
              Search by:
              <div className="flex-col-left-start search-bar--filter--options">
                <div className="flex-row-left-start">
                  <input type="radio" name="search-type" className="margin-12px-H pointer" id="all"
                    value="all" defaultChecked
                    onChange={() => {
                      searchType.current = 'all';
                      handleSearch();
                    }
                    }
                  />
                  <label className="pointer" htmlFor="all">All</label>
                </div>
                <div className="flex-row-left-start">
                  <input type="radio" name="search-type" className="margin-12px-H pointer" id="name"
                    value='name'
                    onChange={() => {
                      searchType.current = page === 'Stores' ? 'storeName' :
                        (page === 'Admins' || page === 'Customers' || page === 'Products' || page === 'Drivers' || page === 'Logs') ? 'name' :
                          (page === 'OrdersHistory' || page === 'Orders') ? 'customer.name' :
                            (page === 'Reviews') ? 'reviewer.name' : 'all';
                      handleSearch();
                    }
                    }
                  />
                  <label className="pointer" htmlFor="name">
                    {page === 'Stores' && 'Store '}
                    {page === 'OrdersHistory' && 'Customer '}
                    {page === 'Orders' && 'Customer '}
                    {page === 'Reviews' && 'Reviewer '}
                    Name
                  </label>
                </div>
                {(page === 'Admins' || page === 'Customers' || page === 'Drivers' || page === 'Logs') &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="email"
                      value="email"
                      onChange={() => {
                        searchType.current = 'email';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="email">Email</label>
                  </div>
                }
                {page === 'Stores' &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="owner-name"
                      value="owner.name"
                      onChange={() => {
                        searchType.current = 'owner.name';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="owner-name">Owner Name</label>
                  </div>
                }
                {(page === 'Admins' || page === 'Customers' || page === 'Stores' || page === 'Drivers') &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="phoneNum"
                      value='phoneNum'
                      onChange={() => {
                        searchType.current = page === 'Stores' ? 'owner.phoneNum' :
                          (page === 'Admins' || page === 'Customers' || page === 'Drivers') ? 'phoneNum' : 'all';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="phoneNum">
                      {page === 'Stores' && 'Owner'} Phone
                    </label>
                  </div>
                }
                {(page === 'Products' || page === 'OrdersHistory' || page === 'Orders') &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="storeName"
                      value="storeName"
                      onChange={() => {
                        searchType.current = 'store.storeName';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="storeName">Store Name</label>
                  </div>
                }
                {page === 'Products' &&
                  <>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-type" className="margin-12px-H pointer" id="category"
                        value="category"
                        onChange={() => {
                          searchType.current = 'subCategory.title';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="category">Sub Category</label>
                    </div>

                    <div className="flex-row-left-start">
                      <input type="radio" name="search-type" className="margin-12px-H pointer" id="material"
                        value="material"
                        onChange={() => {
                          searchType.current = 'material';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="material">Material</label>
                    </div>
                  </>
                }
                {(page === 'OrdersHistory' || page === 'Orders') &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="code"
                      value="code"
                      onChange={() => {
                        searchType.current = 'code';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="code">Order Code</label>
                  </div>
                }
                {page === 'Drivers' &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="city"
                      value="city"
                      onChange={() => {
                        searchType.current = 'city';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="city">City</label>
                  </div>
                }
              </div>
            </div>
          }

          {(page === 'Stores' || page === 'Customers' || page === 'Specialty' || page === 'Categories' || page === 'Products' || page === 'OrdersHistory' || page === 'Orders' || page === 'Drivers' || page === 'Payments' || page === 'Reviews') &&
            <div className="flex-col-left-start size-16px margin-8px-V width-50-100">
              {(page === 'Stores' || page === 'Customers' || page === 'Specialty' || page === 'Categories' || page === 'Products' || page === 'Drivers' || page === 'Payments' || page === 'Reviews') &&
                <div className="flex-row-top-start">
                  Status:
                  <div className="flex-row-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-status" className="margin-12px-H pointer" id="all-status"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.status = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-status">All</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-status" className="margin-12px-H pointer" id="active"
                        value="active"
                        onChange={() => {
                          filter.current.status = 'Active';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="active">Active</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-status" className="margin-12px-H pointer" id="inactive"
                        value="inactive"
                        onChange={() => {
                          filter.current.status = 'InActive';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="inactive">InActive</label>
                    </div>
                  </div>
                </div>
              }
              {page === 'Reviews' &&
                <div className="flex-row-top-start margin-12px-V">
                  Review At:
                  <div className="flex-col-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-reviewee" className="margin-12px-H pointer" id="all-reviewees"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.reviewee = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-reviewees">All</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-reviewee" className="margin-12px-H pointer" id="driver"
                        value="driver"
                        onChange={() => {
                          filter.current.reviewee = 'Driver';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="driver">Driver</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-reviewee" className="margin-12px-H pointer" id="product"
                        value="product"
                        onChange={() => {
                          filter.current.reviewee = 'Product';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="product">Product</label>
                    </div>
                  </div>
                </div>
              }
              {page === 'Stores' && specialities !== null && specialities.length > 0 &&
                <div className="flex-row-top-start margin-12px-V">
                  Speciality:
                  <div className="flex-col-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-specialty" className="margin-12px-H pointer" id="all-speciality"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.specialty = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-speciality">All</label>
                    </div>
                    {specialities.filter((specialty) =>
                      specialty.status === 'Active'
                    ).map((specialty) => (
                      <div className="flex-row-left-start" key={specialty._id}>
                        <input type="radio" name="search-specialty" className="margin-12px-H pointer" id={specialty.title}
                          value={specialty.title}
                          onChange={() => {
                            filter.current.specialty = specialty.title;
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor={specialty.title}>{specialty.title}</label>
                      </div>
                    ))}
                  </div>
                </div>
              }
              {page === 'OrdersHistory' &&
                <div className="flex-row-top-start">
                  Status:
                  <div className="flex-col-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="all-orders-status"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.status = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-orders-status">All</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="cancelledByAdmin"
                        value="cancelled"
                        onChange={() => {
                          filter.current.status = 'CanceledByAdmin';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="cancelledByAdmin">Cancelled By Admin</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="cancelledByCustomer"
                        value="cancelled"
                        onChange={() => {
                          filter.current.status = 'CanceledByCustomer';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="cancelledByCustomer">Cancelled By Customer</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="cancelledByStore"
                        value="cancelled"
                        onChange={() => {
                          filter.current.status = 'CanceledByStore';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="cancelledByStore">Cancelled By Store</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="returned"
                        value="returned"
                        onChange={() => {
                          filter.current.status = 'Returned';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="returned">Returned</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="delivered"
                        value="delivered"
                        onChange={() => {
                          filter.current.status = 'Delivered';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="delivered">Delivered</label>
                    </div>
                  </div>
                </div>
              }
              {page === 'Orders' &&
                <div className="flex-row-top-start">
                  Status:
                  <div className="flex-col-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="all-orders-status"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.status = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-orders-status">All</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="approved"
                        value="approved"
                        onChange={() => {
                          filter.current.status = 'Approved';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="approved">Approved</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="pending"
                        value="pending"
                        onChange={() => {
                          filter.current.status = 'Pending';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="pending">Pending</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="ready"
                        value="ready"
                        onChange={() => {
                          filter.current.status = 'Ready';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="ready">Ready For Pickup</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="picked"
                        value="picked"
                        onChange={() => {
                          filter.current.status = 'Picked';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="ready">Picked</label>
                    </div>
                  </div>
                </div>
              }
              {page === 'Drivers' &&
                <>
                  <div className="flex-row-top-start margin-12px-V">
                    isWorking:
                    <div className="flex-row-left-start2col search-bar--filter--options">
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-status" className="margin-12px-H pointer" id="all-driver-status"
                          value="all" defaultChecked
                          onChange={() => {
                            filter.current.working = 'all';
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="all-driver-status">All</label>
                      </div>
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-status" className="margin-12px-H pointer" id="isWorking"
                          value="isWorking"
                          onChange={() => {
                            filter.current.working = true;
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="isWorking">Online</label>
                      </div>
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-status" className="margin-12px-H pointer" id="isNotWorking"
                          value="isNotWorking"
                          onChange={() => {
                            filter.current.working = false;
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="isNotWorking">Offline</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex-row-top-start">
                    Vehicle:
                    <div className="flex-row-left-start2col search-bar--filter--options flex-wrap">
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-vehicle" className="margin-12px-H pointer" id="all-driver-vehicle"
                          value="all" defaultChecked
                          onChange={() => {
                            filter.current.vehicle = 'all';
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="all-driver-vehicle">All</label>
                      </div>
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-vehicle" className="margin-12px-H pointer" id="car"
                          value="car"
                          onChange={() => {
                            filter.current.vehicle = 'Car';
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="car">Car</label>
                      </div>
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-vehicle" className="margin-12px-H pointer" id="motorcycle"
                          value="motorcycle"
                          onChange={() => {
                            filter.current.vehicle = 'Motorcycle';
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="motorcycle">Motorcycle</label>
                      </div>
                      <div className="flex-row-left-start">
                        <input type="radio" name="search-driver-vehicle" className="margin-12px-H pointer" id="bike"
                          value="bike"
                          onChange={() => {
                            filter.current.vehicle = 'Bike';
                            handleSearch();
                          }
                          }
                        />
                        <label className="pointer" htmlFor="bike">Bike</label>
                      </div>
                    </div>
                  </div>

                </>
              }
            </div>
          }
          {page === 'Logs' &&
            <div className="flex-col-left-start size-16px margin-8px-V width-50-100">
              <div className="flex-row-top-start margin-12px-V">
                Role:
                <div className="flex-col-left-start2col search-bar--filter--options">
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-roles" className="margin-12px-H pointer" id="all-roles"
                      value="all" defaultChecked
                      onChange={() => {
                        filter.current.status = 'all';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="all-roles">All</label>
                  </div>
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-roles" className="margin-12px-H pointer" id="admin"
                      value="admin"
                      onChange={() => {
                        filter.current.status = 'admin';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="admin">Admin</label>
                  </div>
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-roles" className="margin-12px-H pointer" id="store"
                      value="store"
                      onChange={() => {
                        filter.current.status = 'store';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="store">Store</label>
                  </div>
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-roles" className="margin-12px-H pointer" id="driver"
                      value="driver"
                      onChange={() => {
                        filter.current.status = 'driver';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="driver">Driver</label>
                  </div>
                </div>
              </div>
            </div>
          }
        </form>
      }
    </div>
  );
};

export default Search;
