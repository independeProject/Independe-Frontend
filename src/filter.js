export function formatDate(value) {
    const date = value;
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const day = date.getDate();
    let hours = date.getHours();
    hours = hours > 9 ? hours : `0${hours}`;
    const minutes = date.getMinutes();
    return `${month}-${day} ${hours}:${minutes}`;
}