import React, { useEffect, useState } from 'react';

import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import OrderCard from '../../../components/orders/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { customerActions, driverActions, orderActions, storeActions } from '../../../apis/actions';
import { customerMutations, driverMutations, orderMutations, storeMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import './OrderList.scss';

const OrderList = () => {
    const dispatch = useDispatch();
    const orderCards = useSelector(state => state.order.orders);
    const storeData = useSelector(state => state.store.storeData);
    const customerData = useSelector(state => state.customer.customerData);
    const driverData = useSelector(state => state.driver.driverData);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const storeID = searchParams.get('store');
    const customerID = searchParams.get('customer');
    const driverID = searchParams.get('driver');

    useEffect(() => {
        dispatch(orderMutations.setOrder(null));
        dispatch(orderActions.getOrder());

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
        document.title = 'Orders • Admin Panel';
    }, []);

    const braudCramb = (storeID && storeData !== null) ? (
        <>
            <Link to="/admin-panel/orders" className="gray pointer lists-card--link">Orders</Link>
            <span> / </span>
            <span>{storeData.storeName}</span>
        </>
    ) : (customerID && customerData !== null) ? (
        <>
            <Link to="/admin-panel/orders" className="gray pointer lists-card--link">Orders</Link>
            <span> / </span>
            <span>{customerData.name}</span>
        </>
    ) : (driverID && driverData !== null) ? (
        <>
            <Link to="/admin-panel/orders" className="gray pointer lists-card--link">Orders</Link>
            <span> / </span>
            <span>{driverData.name}</span>
        </>
    ) : (
        <>
            <span>Orders</span>
        </>
    );

    let cards = [
        { title: 'Total Orders', content: 0, icon: "bi bi-people orange" },
        { title: 'Pending', content: 0, icon: "bi bi-people orange" },
        { title: 'Approved', content: 0, icon: "bi bi-people orange" },
        { title: 'Ready For Pickup', content: 0, icon: "bi bi-people orange" },
        { title: 'Picked', content: 0, icon: "bi bi-people orange" },
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

    if (orderCards !== null && orderCards.length === 0) {
        content = <p>Found no orders .</p>
    }

    if (orderCards !== null && orderCards.length > 0) {
        const sortedOrder = [...orderCards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let filteredOrder = sortedOrder;
        if (searchQuery !== '') {
            if (searchType === 'all') {
                filteredOrder = filteredOrder.filter(order =>
                    (order.customer.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else {
                filteredOrder = filteredOrder.filter(order => {
                    if (searchType.includes('.')) {
                        return order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase())
                    } else return order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
                });
            }
        }

        if (storeID && storeData) {
            filteredOrder = filteredOrder.filter(order =>
                order.store.storeId === storeData._id
            );
        }
        if (customerID && customerData) {
            filteredOrder = filteredOrder.filter(order =>
                order.customer.customerId === customerData._id
            );
        }
        if (driverID && driverData) {
            filteredOrder = filteredOrder.filter(order =>
                order.driver.driverId === driverData._id
            );
        }

        if (searchStatus !== '' && searchStatus !== 'all') {
            filteredOrder = filteredOrder.filter(order => {
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

        content = filteredOrder.length === 0 ? 'No results found.' :
            filteredOrder.map((orderCard) => {
                return (
                    <ListsCard key={orderCard._id}>
                        <OrderCard type=''
                            order={orderCard}
                        />
                    </ListsCard>
                )
            })

        cards = [
            { title: 'Total Orders', content: orderCards.length, icon: "bi bi-people orange" },
            { title: 'Pending', content: orderCards.filter(orderCard => orderCard.status === 'Pending').length, icon: "bi bi-people orange" },
            { title: 'Approved', content: orderCards.filter(orderCard => orderCard.status === 'Approved').length, icon: "bi bi-people orange" },
            { title: 'Ready For Pickup', content: orderCards.filter(orderCard => orderCard.status === 'Ready').length, icon: "bi bi-people orange" },
            { title: 'Picked', content: orderCards.filter(orderCard => orderCard.status === 'Picked').length, icon: "bi bi-people orange" },
        ]
    }

    return (
        <div className="orders full-width" >
            <div className="orders--braud-cramb gray inter size-16px font-bold">
                {braudCramb}
            </div>
            <div className="orders--cards">
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
                <Search width={'width-90-100'} page={'Orders'} onSearch={handleSearch} />
            </div>

            <div className='flex-col-left-start inter gray'>
                {content}
            </div>
        </div>
    )
}

export default OrderList;