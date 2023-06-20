import React, { useEffect, useState } from 'react';

import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import './OrderHistoryList.scss';
import OrderCard from '../../../components/orders/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistoryActions } from '../../../apis/actions';
import { orderHistoryMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';

const OrderHistoryList = () => {
    const dispatch = useDispatch();
    const orderHistoryCards = useSelector(state => state.orderHistory.ordersHistory);

    useEffect(() => {
        dispatch(orderHistoryMutations.setOrderHistory(null));
        dispatch(orderHistoryActions.getOrderHistory());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'OrdersHistory • Admin Panel';
    }, []);

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
        const sortedOrderHistory = [...orderHistoryCards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                Order History
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