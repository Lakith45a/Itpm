import moment from 'moment';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const prepareExpenseLineChartData = (data=[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
      month: moment(item?.data).format('DD MMM'),
      amount: item?.amount,
      category: item?.category,
    }));

    return chartData;
}