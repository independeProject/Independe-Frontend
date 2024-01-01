import dayjs from "dayjs";

const formatMMDDHHmm = (value) => {
    return `${formatDate(value)} ${formatTime(value)}`;
}

const formatYear = (value) => {
    return dayjs(value).format('YYYY')
}

const formatDate = (value) => {
    return dayjs(value).format('MM-DD');
}

const formatTime = (value) => {
    return dayjs(value).format('HH:mm') ;
}

export default {
    formatMMDDHHmm,
    formatYear,
    formatDate,
    formatTime
}