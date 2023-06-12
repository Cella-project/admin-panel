import React, { useEffect, useState } from 'react';
import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import CustomerCard from '../../../components/customers/CustomerCard';
import { useDispatch, useSelector } from 'react-redux';
import { customerActions } from '../../../apis/actions';
import { customerMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';

import './CustomerList.scss';

const CustomerList = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);

  useEffect(() => {
    document.title = 'Customers • Admin Panel';

    dispatch(customerMutations.setCustomers(null));
    dispatch(customerActions.getCustomers());
  }, [dispatch]);

  let cards = [
    { title: 'Customers', content: 0, icon: "bi bi-people mint-green" },
    { title: 'Active Customers', content: 0, icon: "bi bi-people mint-green" },
    { title: 'Inactive Customers', content: 0, icon: "bi bi-people mint-green" },
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

  if (customers !== null && customers.length === 0) {
    content = <p>Found no customers</p>
  }

  if (customers !== null && customers.length > 0) {
    const numberOfCustomers = customers.length;
    const activeCutomers = customers.filter(customer => customer.status === 'Active').length;
    const inActiveCutomers = customers.filter(customer => customer.status === 'InActive').length;

    if (customers && customers.length > 0) {
      const storedCustomers = [...customers].sort((a, b) => a.name.localeCompare(b.name)); // Sort customers by name

      let filteredCustomers = storedCustomers;
      if (searchQuery !== '') {
        if (searchType === 'all') {
          filteredCustomers = filteredCustomers.filter(customer =>
            (customer.name + customer.email + customer.phoneNum)?.toLowerCase().includes(searchQuery?.toLowerCase())
          );
        } else {
          filteredCustomers = filteredCustomers.filter(customer =>
            customer[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
          );
        }
      }
      if (searchStatus !== '' && searchStatus !== 'all') {
        filteredCustomers = filteredCustomers.filter(customer => {
          return (
            searchQuery === '' ? customer.status === searchStatus :
              (customer.status === searchStatus &&
                (searchType === 'all' ?
                  (customer.name + customer.email + customer.phoneNum)?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                  customer[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
                ))
          )
        }
        );
      }

      content = filteredCustomers.length === 0 ? 'No results found' :
        filteredCustomers.map((customer) => {
          return (
            <ListsCard key={customer._id}>
              <CustomerCard customerCard={customer} />
            </ListsCard>
          );
        });

      cards = [
        { title: 'Customers', content: numberOfCustomers, icon: "bi bi-people mint-green" },
        { title: 'Active Customers', content: activeCutomers, icon: "bi bi-people mint-green" },
        { title: 'Inactive Customers', content: inActiveCutomers, icon: "bi bi-people mint-green" },
      ]
    }
  }

  return (
    <div className="customers full-width" >
      <div className="customers--braud-cramb gray inter size-16px font-bold">
        Customers
      </div>
      <div className="customers--cards">
        {
          cards.map((card, index) => {
            return (
              <GreenCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} mint-green size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </GreenCard>
            );
          })
        }
      </div>
      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} onSearch={handleSearch} page={'Customers'} />
      </div>
      <div className='flex-col-left-start inter gray width-80-100'>
        {content}
      </div>
    </div>
  )
}

export default CustomerList;