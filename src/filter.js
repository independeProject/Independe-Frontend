import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(tz)
dayjs.extend(utc)

dayjs.tz.setDefault("Asia/Seoul")

const formateYYYYMMDDHHmm = (value) => {
    return dayjs(value).format('YYYY-MM-DD HH:mm');
}

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
    return dayjs(value).format('HH:mm');
}

export default {
    formateYYYYMMDDHHmm,
    formatMMDDHHmm,
    formatYear,
    formatDate,
    formatTime
}