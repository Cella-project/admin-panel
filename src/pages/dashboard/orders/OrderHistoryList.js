import React, { useEffect, useState } from 'react';

import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import OrderCard from '../../../components/orders/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { customerActions, driverActions, orderHistoryActions, storeActions } from '../../../apis/actions';
import { customerMutations, driverMutations, orderHistoryMutations, storeMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import './OrderHistoryList.scss';

const OrderHistoryList = () => {
    const dispatch = useDispatch();
    const orderHistoryCards = useSelector(state => state.orderHistory.ordersHistory);
    const storeData = useSelector(state => state.store.storeData);
    const customerData = useSelector(state => state.customer.customerData);
    const driverData = useSelector(state => state.driver.driverData);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const storeID = searchParams.get('store');
    const customerID = searchParams.get('customer');
    const driverID = searchParams.get('driver');

    useEffect(() => {
        dispatch(orderHistoryMutations.setOrderHistory(null));
        dispatch(orderHistoryActions.getOrderHistory());

        if (storeID) {
            dispatch(storeMutations.setStoreData(null));
            dispatch(storeActions.getStoreData(storeID));
        }
        if (customerID) {
            dispatch(customerMutations.setCustomerData(null));
            dispatch(customerActions.getCustomerData(customerID));
        }
        if (driverID) {
            dispatch(driverMutations.setDriverData(null));
            dispatch(driverActions.getDriverData(driverID));
        }
    }, [dispatch, storeID, customerID, driverID]);

    useEffect(() => {
        document.title = 'OrdersHistory • Admin Panel';
    }, []);

    const braudCramb = (storeID && storeData !== null) ? (
        <>
            <Link to="/admin-panel/OrdersHistory" className="gray pointer lists-card--link">Order History</Link>
            <span> / </span>
            <span>{storeData.storeName}</span>
        </>
    ) : (customerID && customerData !== null) ? (
        <>
            <Link to="/admin-panel/OrdersHistory" className="gray pointer lists-card--link">Order History</Link>
            <span> / </span>
            <span>{customerData.name}</span>
        </>
    ) : (driverID && driverData !== null) ? (
        <>
            <Link to="/admin-panel/OrdersHistory" className="gray pointer lists-card--link">Order History</Link>
            <span> / </span>
            <span>{driverData.name}</span>
        </>
    ) : (
        <>
            <span>Order History</span>
        </>
    );

    let cards = [
        { title: 'Total Orders', content: 0, icon: "bi bi-people orange" },
        { title: 'Delivered', content: 0, icon: "bi bi-people orange" },
        { title: 'Pending', content: 0, icon: "bi bi-people orange" },
        { title: 'Cancelled By Customer', content: 0, icon: "bi bi-people orange" },
        { title: 'Cancelled By Admin', content: 0, icon: "bi bi-people orange" },
    ]

    let content = <Loading />;

    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleSearch = (query, type, filter) => {
        setSearchQuery(query);
        setSearchType(type);
        setSearchStatus(filter.status);
    };

    if (orderHistoryCards !== null && orderHistoryCards.length === 0) {
        content = <p>Found no orders history.</p>
    }

    if (orderHistoryCards !== null && orderHistoryCards.length > 0) {
        const sortedOrderHistory = [...orderHistoryCards].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        let filteredOrderHistory = sortedOrderHistory;
        if (searchQuery !== '') {
            if (searchType === 'all') {
                filteredOrderHistory = filteredOrderHistory.filter(order =>
                    (order.customer.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else {
                filteredOrderHistory = filteredOrderHistory.filter(order => {
                    if (searchType.includes('.')) {
                        return order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase())
                    } else return order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
                });
            }
        }

        if (storeID && storeData) {
            filteredOrderHistory = filteredOrderHistory.filter(order =>
                order.store.storeId === storeData._id
            );
        }
        if (customerID && customerData) {
            filteredOrderHistory = filteredOrderHistory.filter(order =>
                order.customer.customerId === customerData._id
            );
        }
        if (driverID && driverData) {
            filteredOrderHistory = filteredOrderHistory.filter(order =>
                order.driver.driverId === driverData._id
            );
        }

        if (searchStatus !== '' && searchStatus !== 'all') {
            filteredOrderHistory = filteredOrderHistory.filter(order => {
                return (
                    searchQuery === '' ? order.status === searchStatus :
                        (order.status === searchStatus &&
                            (searchType === 'all' ?
                                (order.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                (searchType.includes('.') ?
                                    order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                    order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())

                                )
                            ))
                )
            });
        }

        content = filteredOrderHistory.length === 0 ? 'No results found.' :
            filteredOrderHistory.map((orderHistoryCard) => {
                return (
                    <ListsCard key={orderHistoryCard._id}>
                        <OrderCard type='history'
                            order={orderHistoryCard}
                        />
                    </ListsCard>
                )
            })

        cards = [
            { title: 'Total Orders', content: orderHistoryCards.length, icon: "bi bi-people orange" },
            { title: 'Delivered', content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'Delivered').length, icon: "bi bi-people orange" },
            { title: 'Pending', content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'Pending').length, icon: "bi bi-people orange" },
            { title: 'Cancelled By Customer', content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'CanceledByCustomer').length, icon: "bi bi-people orange" },
            { title: 'Cancelled By Admin', content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'CanceledByAdmin').length, icon: "bi bi-people orange" },
        ]
    }

    return (
        <div className="orderHistorys full-width" >
            <div className="orderHistorys--braud-cramb gray inter size-16px font-bold">
                {braudCramb}
            </div>
            <div className="orderHistorys--cards">
                {
                    cards.map((card, index) => {
                        return (
                            <OrangeCard title={card.title} key={index}>
                                <div className="full-width flex-row-center">
                                    <i className='bi bi-receipt orange size-28px'></i>
                                    <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                                </div>
                            </OrangeCard>
                        );
                    })
                }
            </div>

            <div className='flex-row-left-start'>
                <Search width={'width-90-100'} page={'OrdersHistory'} onSearch={handleSearch} />
            </div>

            <div className='flex-col-left-start inter gray'>
                {content}
            </div>
        </div>
    )
}

export default OrderHistoryList;