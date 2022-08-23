import React from 'react';
import Notification from './Notification';

const reservedNotifications = [
    {
        id: 1,
        message: "안녕하세요!"
    },
    {
        id: 2,
        message: "오늘은 8월 22일입니다."
    },
    {
        id: 3,
        message: "반갑습니다."
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return <Notification key={notification.id} id={notification.id} message={notification.message} />;
                })}
            </div>
        )
    }
}

export default NotificationList;