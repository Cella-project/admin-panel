import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import OrangeCard from "../../../components/common/OrangeCard";

import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/products/ProductCard";
import OrderCard from "../../../components/orders/OrderCard";
import Loading from "../../../components/global/Loading";
import { customerActions, productActions, orderHistoryActions, driverApplicationActions, storeApplicationActions } from "../../../apis/actions";

import './Home.scss';

const Home = () => {
  const customers = useSelector((state) => state.customer.customers);
  const products = useSelector((state) => state.product.products);
  const orderHistory = useSelector((state) => state.orderHistory.ordersHistory);
  const driverApplications = useSelector((state) => state.driverApplication.driverApplications);
  const storeApplications = useSelector((state) => state.storeApplication.storeApplications);
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.title = 'Home • Admin Panel';
    dispatch(customerActions.getCustomers());
    dispatch(productActions.getProducts());
    dispatch(orderHistoryActions.getOrderHistory());
    dispatch(driverApplicationActions.getDriverApplications());
    dispatch(storeApplicationActions.getStoreApplications());
  }, [dispatch]);

  let cards = [
    { title: 'Sales', content: 0, icon: "bi bi-currency-dollar" },
    { title: 'Customers', content: 0, icon: "bi bi-people" },
    { title: 'Products', content: 0, icon: "bi bi-box-seam" },
    { title: 'Orders History', content: 0, icon: "bi bi-receipt" },
  ]

  if (customers !== null && products !== null && orderHistory !== null) {
    const sales = orderHistory.filter(orderHistory => orderHistory.status === 'Delivered').reduce((total, orderHistory) => total + orderHistory.total, 0);

    cards = [
      { title: 'Sales', content: sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") },
      { title: 'Customers', content: customers.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-people" },
      { title: 'Products', content: products.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-box-seam" },
      { title: 'Orders History', content: orderHistory.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-receipt" },
    ]
  }

  return (
    <div className="home full-width" >
      <div className="home--braud-cramb inter gray size-16px font-bold">
        Home
      </div>
      <div className="full-width">
        <div className="full-width flex-row2col">
          {
            cards.map((card) => {
              return (
                <OrangeCard title={card.title} key={Math.random().toString()}>
                  <div className="full-width flex-row-center">
                    <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                    {card.title === 'Sales' ? <p className="size-30px orange no-margin text-shadow inter">EGP</p> :
                      <i className={`${card.icon} orange size-30px`} />
                    }
                  </div>
                </OrangeCard>
              );
            })
          }

        </div>
        <div className="full-width flex-row2col home">
          {storeApplications !== null && (
            <Link to={`/admin-panel/stores/storeApplications`} className={`home--application-container full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
              Application Stores
              {storeApplications.filter(storeApplication => storeApplication.status === 'Pending').length > 0 && (
                <div className='home--pending-badge shadow-5px white font-bold red-bg size-12px flex-row-center'>
                  {storeApplications.filter(storeApplication => storeApplication.status === 'Pending').length}
                </div>
              )}
            </Link>
          )}
          {driverApplications !== null && (
            <Link to={`/admin-panel/drivers/driverApplications`} className={`home--application-container full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
              Application Drivers
              {driverApplications.filter(driverApplication => driverApplication.status === 'Pending').length > 0 && (
                <div className='home--pending-badge red-bg size-12px font-bold flex-row-center'>
                  {driverApplications.filter(driverApplication => driverApplication.status === 'Pending').length}
                </div>
              )}
            </Link>
          )}
        </div>
        <div className="full-width flex-row2col home">
          <div className="full-width flex-row-top-between2col">
            <OrangeCard title="New Products">
              {products && products !== null ?
                <PerfectScrollbar className="home--scroll--cont full-width flex-col-top-start">
                  {products
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
                    .map((product) => (
                      <ProductCard key={product._id} productCard={product} />
                    ))
                  }
                </PerfectScrollbar>
                : <Loading />
              }
              <Link to={`/admin-panel/Products`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
            <OrangeCard title="Orders History">
              {orderHistory && orderHistory !== null ?
                <PerfectScrollbar className="home--scroll--cont full-width flex-col-top-start">
                  {orderHistory.length === 0 ? <p className="gray inter size-16px">No Orders History.</p> :
                    orderHistory
                      .slice()
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 5)
                      .map((orderHistory) => (
                        <OrderCard type='history' key={orderHistory._id} order={orderHistory} />
                      ))}
                </PerfectScrollbar> : <Loading />
              }
              <Link to={`/admin-panel/OrdersHistory`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
          </div>
        </div>
      </div >
    </div>
  );
}

export default Home;