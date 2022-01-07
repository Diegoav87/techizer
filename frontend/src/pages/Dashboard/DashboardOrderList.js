import React from 'react';

import OrderList from '../../components/Orders/OrderList';

const DashboardOrderList = () => {
    return (
        <OrderList url={"orders/user/"} />
    )
}

export default DashboardOrderList
