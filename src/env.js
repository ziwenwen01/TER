/**
 *
 * @type {{baseUrl: string, host: string}}
 */
const dev = {
    host: '/app',
    baseUrl: 'http://ter.wzjo2o.com',
    contractAddress: 'TDwX7GtW4m32DJf7nYKcWYzKTZPWKCySsf',          // 合约地址 测试
    tokenAddress: "TScYJwLg58RrhLHFrDEJrtd3c5hRM8cL8K",             // USDT地址 测试
    decimal: 6,
    transactionHost: 'https://shasta.tronscan.org/#/transcation/',
    transactionAddr: 'https://shasta.tronscan.org/#/address/',
    shareUrl: 'https://ter-tron.com',
};

const pro = {
    host: "",
    baseUrl: "https://smart.ter-tron.com",
    contractAddress: "TR6ftAB6ZmDYLJdjHVA2LJR6t4wdPgS1FL", // 合约地址
    tokenAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", // USDT地址
    decimal: 6,
    transactionHost: "https://tronscan.io/#/transaction/",
    transactionAddr: "https://tronscan.io/#/address/",
    shareUrl: 'https://ter-tron.com',
};

let env = {};
if (process.env.NODE_ENV === 'development') {
    env = {...dev};
} else if (process.env.VUE_APP_CURRENT_MODE === 'test') {
    env = {...dev, host: ''};
} else if (process.env.VUE_APP_CURRENT_MODE === 'production') {
    env = {...pro};
}

module.exports = env;
