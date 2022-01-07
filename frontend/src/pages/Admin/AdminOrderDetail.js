import React from 'react';

import OrderDetail from '../../components/Orders/OrderDetail';

const AdminOrderDetail = () => {
    return (
        <OrderDetail admin={true} />
    )
}

export default AdminOrderDetail;
